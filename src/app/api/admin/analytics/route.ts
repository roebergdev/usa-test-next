import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const VERCEL_API = 'https://api.vercel.com/v1/web/insights/stats';

function getLast7Days() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 6);
  return {
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0],
  };
}

async function fetchStat(stat: string, projectId: string, token: string, from: string, to: string) {
  const params = new URLSearchParams({ projectId, from, to, environment: 'production' });
  const url = `${VERCEL_API}/${stat}?${params}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error(`[admin/analytics] ${stat} fetch failed (${res.status}):`, text);
    return null;
  }
  return res.json();
}

export async function GET(req: NextRequest) {
  // Validate the caller is a logged-in admin via their Supabase access token.
  const authHeader = req.headers.get('authorization');
  const accessToken = authHeader?.replace('Bearer ', '');
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) {
    console.error('[admin/analytics] Missing env vars:', { hasToken: !!token, hasProjectId: !!projectId });
    return NextResponse.json({ error: 'Vercel analytics not configured' }, { status: 503 });
  }

  const { from, to } = getLast7Days();
  const [visits, pages] = await Promise.all([
    fetchStat('visits', projectId, token, from, to),
    fetchStat('pages', projectId, token, from, to),
  ]);

  const visitData: { key: string; total: number; unique: number }[] = visits?.data ?? [];
  const totalPageViews = visitData.reduce((sum, d) => sum + (d.total ?? 0), 0);
  const totalVisitors = visitData.reduce((sum, d) => sum + (d.unique ?? 0), 0);
  const todayEntry = visitData.find((d) => d.key === to);

  return NextResponse.json({
    period: { from, to },
    totalPageViews,
    totalVisitors,
    todayPageViews: todayEntry?.total ?? 0,
    todayVisitors: todayEntry?.unique ?? 0,
    dailySeries: visitData,
    topPages: (pages?.data ?? []).slice(0, 5),
  });
}
