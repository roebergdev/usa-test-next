-- Admin policies for authenticated users
-- Run this in Supabase SQL Editor after creating an admin user via Supabase Auth

-- Grant authenticated role access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.questions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leaderboard TO authenticated;
GRANT SELECT ON public.leads TO authenticated;

-- Questions: authenticated users can do full CRUD
CREATE POLICY "Authenticated users can manage questions"
  ON public.questions FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Leaderboard: authenticated users can delete entries
CREATE POLICY "Authenticated users can delete leaderboard entries"
  ON public.leaderboard FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leaderboard"
  ON public.leaderboard FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Leads: authenticated users can read all leads
CREATE POLICY "Authenticated users can read leads"
  ON public.leads FOR SELECT
  USING (auth.role() = 'authenticated');
