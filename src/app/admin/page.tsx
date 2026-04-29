'use client';

import { useEffect, useState } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Gamepad2, Users, HelpCircle, Mail, TrendingUp, Layers, Eye, MousePointerClick } from 'lucide-react';

interface Stats {
  totalGames: number;
  uniquePlayers: number;
  totalLeads: number;
  totalQuestions: number;
  avgScore: number;
  categories: number;
}

interface AnalyticsData {
  period: { from: string; to: string };
  totalPageViews: number;
  totalVisitors: number;
  todayPageViews: number;
  todayVisitors: number;
  dailySeries: { key: string; total: number; unique: number }[];
  topPages: { key: string; total: number }[];
}

export default function AdminDashboard() {
  const { supabase } = useSupabaseContext();
  const [stats, setStats] = useState<Stats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [recentGames, setRecentGames] = useState<{ display_name: string; score: number; total_questions: number; created_at: string; source: 'leaderboard' | 'daily' }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const [leaderboard, dailyResults, leads, questions, leaderboardCount, dailyCount] = await Promise.all([
        supabase.from('leaderboard').select('display_name, score, created_at').order('created_at', { ascending: false }).limit(20),
        supabase.from('daily_results').select('score, total_questions, created_at').order('created_at', { ascending: false }).limit(20),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('category', { count: 'exact' }),
        supabase.from('leaderboard').select('id', { count: 'exact', head: true }),
        supabase.from('daily_results').select('id', { count: 'exact', head: true }),
      ]);

      const entries = leaderboard.data || [];
      const uniqueNames = new Set(entries.map((e) => e.display_name));
      const totalScore = entries.reduce((sum, e) => sum + e.score, 0);
      const categories = new Set((questions.data || []).map((q) => q.category));

      setStats({
        totalGames: (leaderboardCount.count || 0) + (dailyCount.count || 0),
        uniquePlayers: uniqueNames.size,
        totalLeads: leads.count || 0,
        totalQuestions: questions.count || 0,
        avgScore: entries.length > 0 ? Math.round(totalScore / entries.length) : 0,
        categories: categories.size,
      });

      const combined = [
        ...entries.map((e) => ({ display_name: e.display_name, score: e.score, total_questions: 10, created_at: e.created_at, source: 'leaderboard' as const })),
        ...(dailyResults.data || []).map((e) => ({ display_name: 'Daily Quiz', score: e.score, total_questions: e.total_questions ?? 10, created_at: e.created_at, source: 'daily' as const })),
      ]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      setRecentGames(combined);
      setLoading(false);

      // Fetch Vercel analytics with the current session token
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const res = await fetch('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (res.ok) {
          setAnalytics(await res.json());
        } else {
          const { error } = await res.json().catch(() => ({ error: 'Failed to load' }));
          setAnalyticsError(error);
        }
      }
    }

    fetchAll();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amac-blue" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Games', value: stats?.totalGames ?? 0, icon: Gamepad2, color: 'text-blue-400' },
    { label: 'Unique Players', value: stats?.uniquePlayers ?? 0, icon: Users, color: 'text-green-400' },
    { label: 'Leads Collected', value: stats?.totalLeads ?? 0, icon: Mail, color: 'text-purple-400' },
    { label: 'Questions', value: stats?.totalQuestions ?? 0, icon: HelpCircle, color: 'text-yellow-400' },
    { label: 'Avg Score', value: stats?.avgScore ?? 0, icon: TrendingUp, color: 'text-pink-400' },
    { label: 'Categories', value: stats?.categories ?? 0, icon: Layers, color: 'text-cyan-400' },
  ];

  const maxVisitors = Math.max(...(analytics?.dailySeries.map((d) => d.unique) ?? [1]), 1);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* ── App stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">{card.label}</span>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-3xl font-bold text-white">{card.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* ── Vercel Analytics ── */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Traffic{' '}
          {analytics && (
            <span className="text-sm font-normal text-gray-400">
              {analytics.period.from} → {analytics.period.to}
            </span>
          )}
        </h2>

        {analyticsError ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-gray-400 text-sm">
            {analyticsError === 'Vercel analytics not configured'
              ? 'Add VERCEL_API_TOKEN and VERCEL_PROJECT_ID to your environment variables to enable traffic analytics.'
              : `Could not load analytics: ${analyticsError}`}
          </div>
        ) : analytics ? (
          <div className="space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Visitors (7d)', value: analytics.totalVisitors, icon: Users, color: 'text-blue-400' },
                { label: 'Page Views (7d)', value: analytics.totalPageViews, icon: Eye, color: 'text-green-400' },
                { label: "Today's Visitors", value: analytics.todayVisitors, icon: Users, color: 'text-purple-400' },
                { label: "Today's Views", value: analytics.todayPageViews, icon: MousePointerClick, color: 'text-yellow-400' },
              ].map((card) => (
                <div key={card.label} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400">{card.label}</span>
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{card.value.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* 7-day visitor chart */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Daily Visitors (last 7 days)</h3>
              <div className="flex items-end gap-2 h-28">
                {analytics.dailySeries.map((day) => (
                  <div key={day.key} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500">{day.unique}</span>
                    <div
                      className="w-full bg-amac-blue rounded-t"
                      style={{ height: `${Math.max(4, (day.unique / maxVisitors) * 96)}px` }}
                    />
                    <span className="text-[9px] text-gray-500">
                      {new Date(day.key + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top pages */}
            {analytics.topPages.length > 0 && (
              <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-5 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-300">Top Pages (7d)</h3>
                </div>
                <div className="divide-y divide-gray-700">
                  {analytics.topPages.map((page) => (
                    <div key={page.key} className="px-5 py-3 flex items-center justify-between">
                      <span className="text-sm text-gray-300 font-mono">{page.key || '/'}</span>
                      <span className="text-sm font-bold text-white">{page.total.toLocaleString()} views</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amac-blue" />
          </div>
        )}
      </div>

      {/* ── Recent Games ── */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Recent Games</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {recentGames.length === 0 ? (
            <div className="p-6 text-center text-gray-400">No games played yet</div>
          ) : (
            recentGames.map((game, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">{game.display_name}</p>
                    {game.source === 'daily' && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">daily</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(game.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="text-lg font-bold text-amac-blue">
                  {game.score}<span className="text-neutral-500 text-sm font-medium">/{game.total_questions}</span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
