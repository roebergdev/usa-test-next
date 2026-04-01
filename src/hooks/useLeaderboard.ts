'use client';

import { useEffect, useState } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { LeaderboardEntry } from '@/lib/types';

export function useLeaderboard() {
  const { supabase } = useSupabaseContext();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);
    if (data) setLeaderboard(data as LeaderboardEntry[]);
  };

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase
      .channel('leaderboard-changes')
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
  }, []);

  return { leaderboard };
}
