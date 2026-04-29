import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  // Validate admin via Supabase access token.
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error: queryError } = await supabaseAdmin
    .from('daily_results')
    .select('score, total_questions, created_at, user_id, users(first_name, last_initial)')
    .order('created_at', { ascending: false })
    .limit(100);

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  type Row = {
    score: number;
    total_questions: number | null;
    created_at: string;
    user_id: string | null;
    users: { first_name: string | null; last_initial: string | null }[] | { first_name: string | null; last_initial: string | null } | null;
  };

  const games = ((data ?? []) as unknown as Row[]).map((e) => {
    const u = Array.isArray(e.users) ? e.users[0] : e.users;
    const name = u?.first_name
      ? `${u.first_name} ${u.last_initial ?? ''}.`.trim()
      : 'Daily Quiz';
    return {
      display_name: name,
      score: e.score,
      total_questions: e.total_questions ?? 10,
      created_at: e.created_at,
      source: e.user_id ? 'leaderboard' : 'daily',
    };
  });

  return NextResponse.json({ games });
}
