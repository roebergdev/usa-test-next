import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { masterQuestions } from '@/data/masterQuestions';

export async function POST(request: Request) {
  const authHeader = request.headers.get('x-admin-key');
  if (authHeader !== process.env.ADMIN_SECRET_KEY) {
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
