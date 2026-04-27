'use client';

import { useEffect, useState } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { LeaderboardEntry, QuizMode } from '@/lib/types';

export function useLeaderboard(mode?: QuizMode) {
  const { supabase } = useSupabaseContext();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    let query = supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('time_seconds', { ascending: true, nullsFirst: false })
      .limit(200);
    if (mode) {
      query = query.eq('mode', mode);
    }
    const { data } = await query;
    if (data) setLeaderboard(data as LeaderboardEntry[]);
  };

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase
      .channel(`leaderboard-changes-${mode ?? 'all'}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leaderboard' },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mode]);

  return { leaderboard };
}
