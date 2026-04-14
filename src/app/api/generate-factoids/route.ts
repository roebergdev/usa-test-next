import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const BATCH_SIZE = 50;       // questions per route invocation
const SUB_BATCH_SIZE = 10;   // questions per Gemini call
const INTER_CALL_DELAY = 300; // ms between Gemini calls

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function isAuthorized(request: Request): Promise<boolean> {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey === process.env.ADMIN_SECRET_KEY) return true;

  const authToken = request.headers.get('authorization')?.replace('Bearer ', '');
  if (authToken) {
    const sb = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${authToken}` } } }
    );
    const { data: { user } } = await sb.auth.getUser();
    if (user) return true;
  }

  return false;
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
  }

  // Fetch next batch of questions missing explanations
  const { data: questions, error } = await supabaseAdmin
    .from('questions')
    .select('id, text, correct_answer')
    .is('explanation', null)
    .order('id')
    .limit(BATCH_SIZE);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Count remaining (including current batch)
  const { count: remainingCount } = await supabaseAdmin
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .is('explanation', null);

  if (!questions || questions.length === 0) {
    return NextResponse.json({ processed: 0, updated: 0, skipped: 0, remaining: 0, done: true });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let updated = 0;
  let skipped = 0;

  // Process in sub-batches
  for (let i = 0; i < questions.length; i += SUB_BATCH_SIZE) {
    const subBatch = questions.slice(i, i + SUB_BATCH_SIZE);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: `You are writing educational factoids for a USA trivia app.
For each question below, write ONE factoid (1-2 sentences, max 60 words).
Rules:
- Do NOT just restate the correct answer.
- Add historical context, a surprising detail, or real-world significance.
- Be engaging and concise.
- Return ONLY a JSON array of strings, one per question, in the same order as the input.

Questions:
${JSON.stringify(subBatch.map((q) => ({ q: q.text, answer: q.correct_answer })))}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      });

      let text = response.text || '';
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const factoids: string[] = JSON.parse(text);

      if (!Array.isArray(factoids) || factoids.length !== subBatch.length) {
        throw new Error('Factoid count mismatch');
      }

      // Update each question individually to avoid partial failures
      for (let j = 0; j < subBatch.length; j++) {
        const { error: updateError } = await supabaseAdmin
          .from('questions')
          .update({ explanation: factoids[j] })
          .eq('id', subBatch[j].id);

        if (updateError) {
          console.error(`Failed to update question ${subBatch[j].id}:`, updateError.message);
          skipped++;
        } else {
          updated++;
        }
      }
    } catch (err) {
      console.error(`Sub-batch ${i}-${i + SUB_BATCH_SIZE} failed:`, err);
      skipped += subBatch.length;
    }

    if (i + SUB_BATCH_SIZE < questions.length) {
      await sleep(INTER_CALL_DELAY);
    }
  }

  const remaining = Math.max(0, (remainingCount ?? 0) - updated);
  return NextResponse.json({
    processed: questions.length,
    updated,
    skipped,
    remaining,
    done: remaining === 0,
  });
}
