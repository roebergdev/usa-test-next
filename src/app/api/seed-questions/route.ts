import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { masterQuestions } from '@/data/masterQuestions';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  // Allow access via admin secret key or authenticated Supabase session
  const adminKey = request.headers.get('x-admin-key');
  const authToken = request.headers.get('authorization')?.replace('Bearer ', '');

  let authorized = adminKey === process.env.ADMIN_SECRET_KEY;

  if (!authorized && authToken) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const sb = createSupabaseClient(url, key, {
      global: { headers: { Authorization: `Bearer ${authToken}` } },
    });
    const { data: { user } } = await sb.auth.getUser();
    authorized = !!user;
  }

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const supabase = await createClient();

  try {
    const { data: existing } = await supabase.from('questions').select('text');
    const existingTexts = new Set(
      (existing || []).map((q: { text: string }) => q.text.trim().toLowerCase())
    );

    const newQuestions = masterQuestions
      .filter((q) => !existingTexts.has(q.text.trim().toLowerCase()))
      .map((q) => ({
        text: q.text,
        options: q.options,
        correct_answer: q.correctAnswer,
        category: q.category,
        difficulty: q.difficulty,
      }));

    if (newQuestions.length === 0) {
      return NextResponse.json({
        message: 'All questions in the master list are already in the database!',
      });
    }

    const batchSize = 500;
    let addedCount = 0;
    for (let i = 0; i < newQuestions.length; i += batchSize) {
      const batch = newQuestions.slice(i, i + batchSize);
      const { error } = await supabase.from('questions').insert(batch);
      if (error) throw error;
      addedCount += batch.length;
    }

    return NextResponse.json({
      message: `Successfully added ${addedCount} new unique questions!`,
    });
  } catch (error) {
    console.error('Seeding failed:', error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
