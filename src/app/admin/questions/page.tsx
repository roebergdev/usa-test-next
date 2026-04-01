'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Plus, Pencil, Trash2, Search, Upload, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';

interface DBQuestion {
  id: string;
  text: string;
  options: string[];
  correct_answer: string;
  category: string;
  difficulty: number;
  created_at: string;
}

const CATEGORIES = [
  'History', 'Geography', 'Government', 'Culture', 'Science',
  'Presidents', 'Constitution', 'Military', 'Economics', 'Sports',
];

const ITEMS_PER_PAGE = 20;

const emptyForm = {
  text: '',
  options: ['', '', '', ''],
  correct_answer: '',
  category: 'History',
  difficulty: 5,
};

export default function QuestionsAdmin() {
  const { supabase } = useSupabaseContext();
  const [questions, setQuestions] = useState<DBQuestion[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Seed state
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState('');

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('questions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

    if (search) {
      query = query.ilike('text', `%${search}%`);
    }
    if (filterCategory) {
      query = query.eq('category', filterCategory);
    }
    if (filterDifficulty) {
      query = query.eq('difficulty', parseInt(filterDifficulty));
    }

    const { data, count } = await query;
    setQuestions(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [supabase, page, search, filterCategory, filterDifficulty]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (q: DBQuestion) => {
    setEditingId(q.id);
    setForm({
      text: q.text,
      options: [...q.options],
      correct_answer: q.correct_answer,
      category: q.category,
      difficulty: q.difficulty,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.text || form.options.some((o) => !o) || !form.correct_answer) {
      alert('Please fill in all fields');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('questions')
          .update({
            text: form.text,
            options: form.options,
            correct_answer: form.correct_answer,
            category: form.category,
            difficulty: form.difficulty,
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('questions').insert({
          text: form.text,
          options: form.options,
          correct_answer: form.correct_answer,
          category: form.category,
          difficulty: form.difficulty,
        });
        if (error) throw error;
      }
      setShowModal(false);
      fetchQuestions();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save question');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this question?')) return;
    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
    } else {
      fetchQuestions();
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will seed questions from the master list. Continue?')) return;
    setSeeding(true);
    setSeedResult('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/seed-questions', {
        method: 'POST',
        headers: {
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
      });
      const data = await res.json();
      setSeedResult(data.message || data.error || 'Done');
      fetchQuestions();
    } catch {
      setSeedResult('Seed request failed');
    } finally {
      setSeeding(false);
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Questions</h1>
          <p className="text-gray-400 text-sm mt-1">{totalCount} total questions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {seeding ? 'Seeding...' : 'Bulk Seed'}
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-amac-blue text-white rounded-lg hover:bg-amac-blue/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      {seedResult && (
        <div className="mb-4 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-3 rounded-lg text-sm">
          {seedResult}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amac-blue"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setPage(0); }}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amac-blue"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterDifficulty}
          onChange={(e) => { setFilterDifficulty(e.target.value); setPage(0); }}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amac-blue"
        >
          <option value="">All Difficulties</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
            <option key={d} value={d}>Difficulty {d}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amac-blue" />
          </div>
        ) : questions.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No questions found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Question</th>
                <th className="px-6 py-3 w-28">Category</th>
                <th className="px-6 py-3 w-20 text-center">Diff</th>
                <th className="px-6 py-3 w-28">Answer</th>
                <th className="px-6 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 text-sm text-gray-200 max-w-md truncate">{q.text}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{q.category}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      q.difficulty <= 3 ? 'bg-green-500/20 text-green-400' :
                      q.difficulty <= 6 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-green-400 truncate max-w-[120px]">{q.correct_answer}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(q)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(q.id)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? 'Edit Question' : 'Add Question'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Question Text</label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amac-blue resize-none"
                  rows={3}
                  placeholder="Enter the question..."
                />
              </div>

              {form.options.map((opt, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Option {String.fromCharCode(65 + i)}
                  </label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...form.options];
                      newOpts[i] = e.target.value;
                      setForm({ ...form, options: newOpts });
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amac-blue"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Correct Answer</label>
                <select
                  value={form.correct_answer}
                  onChange={(e) => setForm({ ...form, correct_answer: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amac-blue"
                >
                  <option value="">Select correct answer</option>
                  {form.options.filter(Boolean).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amac-blue"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Difficulty ({form.difficulty})
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: parseInt(e.target.value) })}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-amac-blue text-white rounded-lg hover:bg-amac-blue/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
