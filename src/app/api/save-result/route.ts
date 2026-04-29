import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getTodayString } from '@/lib/daily';
import { SESSION_COOKIE } from '../../../../middleware';

interface SaveResultBody {
  score: number;
  totalQuestions: number;
  timeSeconds: number;
}

/**
 * POST /api/save-result
 *
 * Persists the daily quiz result to the database.
 * Reads session_id from the HTTP-only cookie server-side so the client
 * never needs to know its own session ID.
 */
export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) {
    return NextResponse.json({ error: 'No session' }, { status: 401 });
  }

  let body: SaveResultBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { score, totalQuestions, timeSeconds } = body;

  // Check if a result already exists for this session today (idempotent).
  const { data: existing } = await supabaseAdmin
    .from('daily_results')
    .select('id')
    .eq('session_id', sessionId)
    .eq('quiz_date', getTodayString())
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, alreadySaved: true });
  }

  const { error } = await supabaseAdmin.from('daily_results').insert({
    quiz_date: getTodayString(),
    session_id: sessionId,
    score,
    total_questions: totalQuestions,
    time_seconds: timeSeconds,
  });

  if (error) {
    console.error('[api/save-result] Failed to insert daily result:', error.message);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
