-- daily_results: one row per anonymous session per day
create table public.daily_results (
  id uuid default gen_random_uuid() primary key,
  quiz_date date not null,
  session_id text not null,
  score int not null,
  total_questions int not null default 5,
  created_at timestamptz default now()
);

alter table public.daily_results enable row level security;

create policy "Anyone can insert daily results" on public.daily_results
  for insert with check (true);

create policy "Anyone can read daily results" on public.daily_results
  for select using (true);

-- Add mode to leaderboard so daily and practice scores are separate
alter table public.leaderboard
  add column mode text not null default 'practice'
  check (mode in ('daily', 'practice'));

create index idx_leaderboard_mode on public.leaderboard(mode, score desc);
