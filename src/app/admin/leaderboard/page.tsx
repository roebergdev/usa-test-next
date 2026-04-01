'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Trash2, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  display_name: string;
  score: number;
  created_at: string;
}

const ITEMS_PER_PAGE = 25;

export default function LeaderboardAdmin() {
  const { supabase } = useSupabaseContext();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, count } = await supabase
      .from('leaderboard')
      .select('*', { count: 'exact' })
      .order('score', { ascending: false })
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

    setEntries(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [supabase, page]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this leaderboard entry?')) return;
    const { error } = await supabase.from('leaderboard').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
    } else {
      fetchEntries();
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Clear ALL leaderboard entries? This cannot be undone.')) return;
    if (!confirm('Are you absolutely sure?')) return;
    const { error } = await supabase.from('leaderboard').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) {
      alert('Failed to clear: ' + error.message);
    } else {
      fetchEntries();
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
          <p className="text-gray-400 text-sm mt-1">{totalCount} total entries</p>
        </div>
        <button
          onClick={handleClearAll}
          disabled={entries.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amac-blue" />
          </div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No leaderboard entries yet</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 w-16">#</th>
                <th className="px-6 py-3">Player</th>
                <th className="px-6 py-3 w-28">Score</th>
                <th className="px-6 py-3 w-40">Date</th>
                <th className="px-6 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {entries.map((entry, i) => {
                const rank = page * ITEMS_PER_PAGE + i + 1;
                return (
                  <tr key={entry.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 text-sm">
                      {rank <= 3 ? (
                        <Trophy className={`w-4 h-4 ${
                          rank === 1 ? 'text-yellow-400' :
                          rank === 2 ? 'text-gray-300' :
                          'text-amber-600'
                        }`} />
                      ) : (
                        <span className="text-gray-400">{rank}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200 font-medium">{entry.display_name}</td>
                    <td className="px-6 py-4 text-sm font-bold text-amac-blue">{entry.score.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(entry.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-400">Page {page + 1} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-2 text-gray-400 hover:text-white disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-2 text-gray-400 hover:text-white disabled:opacity-30">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
