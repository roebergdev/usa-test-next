'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { ChevronLeft, ChevronRight, Download, RefreshCw } from 'lucide-react';

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  type: 'email' | 'phone';
  score: number;
  created_at: string;
}

const ITEMS_PER_PAGE = 25;

export default function LeadsAdmin() {
  const { supabase } = useSupabaseContext();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data, count } = await supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

    setLeads(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [supabase, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const exportCSV = () => {
    const header = 'Name,Phone,Score,Date\n';
    const rows = leads.map((l) =>
      `${l.name ?? ''},${l.phone ?? l.email ?? ''},${l.score},${l.created_at}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-gray-400 text-sm mt-1">{totalCount} total leads</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchLeads()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amac-blue" />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No leads collected yet</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3 w-24">Score</th>
                <th className="px-6 py-3 w-40">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {lead.name ?? <span className="text-gray-500 italic">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {lead.phone ?? lead.email ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-amac-blue">
                    {lead.score.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
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
