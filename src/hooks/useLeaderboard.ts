'use client';

import { useEffect, useRef, useState } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { LeaderboardEntry, QuizMode } from '@/lib/types';

const POLL_INTERVAL_MS = 30_000;

export function useLeaderboard(mode?: QuizMode) {
  const { supabase } = useSupabaseContext();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const fetchingRef = useRef(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      try {
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
      } finally {
        fetchingRef.current = false;
      }
    };

    fetchLeaderboard();
    const id = setInterval(fetchLeaderboard, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [mode]);

  return { leaderboard };
}
