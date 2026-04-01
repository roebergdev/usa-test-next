'use client';

import { useEffect, useState } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Gamepad2, Users, HelpCircle, Mail, TrendingUp, Layers } from 'lucide-react';

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
  const [recentGames, setRecentGames] = useState<{ display_name: string; score: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [leaderboard, leads, questions] = await Promise.all([
        supabase.from('leaderboard').select('display_name, score, created_at'),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('category'),
      ]);

      const entries = leaderboard.data || [];
      const uniqueNames = new Set(entries.map((e) => e.display_name));
      const totalScore = entries.reduce((sum, e) => sum + e.score, 0);
      const categories = new Set((questions.data || []).map((q) => q.category));

      setStats({
        totalGames: entries.length,
        uniquePlayers: uniqueNames.size,
        totalLeads: leads.count || 0,
        totalQuestions: (questions.data || []).length,
        avgScore: entries.length > 0 ? Math.round(totalScore / entries.length) : 0,
        categories: categories.size,
      });

      setRecentGames(
        entries
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 10)
      );
      setLoading(false);
    }

    fetchStats();
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
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  <p className="text-white font-medium">{game.display_name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(game.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="text-lg font-bold text-amac-blue">{game.score.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
