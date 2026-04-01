import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const authHeader = request.headers.get('x-admin-key');
  if (authHeader !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const supabase = await createClient();

  try {
    const { data: allQuestions } = await supabase
      .from('questions')
      .select('id, text');

    if (!allQuestions || allQuestions.length === 0) {
      return NextResponse.json({ message: 'No questions found.' });
    }

    const seen = new Set<string>();
    const duplicateIds: string[] = [];

    for (const q of allQuestions) {
      const key = q.text.trim().toLowerCase();
      if (seen.has(key)) {
        duplicateIds.push(q.id);
      } else {
        seen.add(key);
      }
    }

    if (duplicateIds.length === 0) {
      return NextResponse.json({ message: 'No duplicates found!' });
    }

    const batchSize = 500;
    let deletedCount = 0;
    for (let i = 0; i < duplicateIds.length; i += batchSize) {
      const batch = duplicateIds.slice(i, i + batchSize);
      const { error } = await supabase
        .from('questions')
        .delete()
        .in('id', batch);
      if (error) throw error;
      deletedCount += batch.length;
    }

    return NextResponse.json({
      message: `Successfully deleted ${deletedCount} duplicate questions!`,
    });
  } catch (error) {
    console.error('Cleanup failed:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
