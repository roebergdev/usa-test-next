'use client';

import { useEffect, useState } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Gamepad2, Users, HelpCircle, Mail, TrendingUp, Layers, BarChart3, ExternalLink } from 'lucide-react';

interface Stats {
  totalGames: number;
  uniquePlayers: number;
  totalLeads: number;
  totalQuestions: number;
  avgScore: number;
  categories: number;
}

export default function AdminDashboard() {
  const { supabase } = useSupabaseContext();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentGames, setRecentGames] = useState<{ display_name: string; score: number; total_questions: number; created_at: string; source: 'leaderboard' | 'daily' }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const [leaderboard, leads, questions, dailyCount] = await Promise.all([
        supabase.from('leaderboard').select('display_name, score').order('created_at', { ascending: false }).limit(50),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('category', { count: 'exact' }),
        supabase.from('daily_results').select('id', { count: 'exact', head: true }),
      ]);

      const lbEntries = leaderboard.data || [];
      const uniqueNames = new Set(lbEntries.map((e) => e.display_name));
      const totalScore = lbEntries.reduce((sum, e) => sum + e.score, 0);
      const categories = new Set((questions.data || []).map((q) => q.category));

      setStats({
        totalGames: dailyCount.count || 0,
        uniquePlayers: uniqueNames.size,
        totalLeads: leads.count || 0,
        totalQuestions: questions.count || 0,
        avgScore: lbEntries.length > 0 ? Math.round(totalScore / lbEntries.length) : 0,
        categories: categories.size,
      });

      // Fetch recent games via server route so the join to `users` (RLS-blocked
      // on the anon client) returns names.
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const res = await fetch('/api/admin/recent-games', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (res.ok) {
          const { games } = await res.json();
          setRecentGames(games);
        }
      }
      setLoading(false);
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

      {/* ── Traffic (link to Vercel Analytics) ── */}
      <a
        href="https://vercel.com/usa-test1/usa-test-next/analytics"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-amac-blue transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amac-blue/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-amac-blue" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">View Traffic Analytics</h2>
              <p className="text-sm text-gray-400">Visitors, page views, top pages, and devices on Vercel</p>
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-amac-blue transition-colors" />
        </div>
      </a>

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
                <span className="text-lg font-bold text-green-400">
                  {game.score}<span className="text-gray-500 text-sm font-medium">/{game.total_questions}</span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
