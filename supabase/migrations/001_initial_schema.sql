-- Leaderboard table (no auth required)
create table public.leaderboard (
  id uuid default gen_random_uuid() primary key,
  display_name text not null,
  score int not null check (score >= 0),
  created_at timestamptz default now()
);

-- Questions table
create table public.questions (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  options text[] not null check (array_length(options, 1) = 4),
  correct_answer text not null,
  category text not null,
  difficulty int not null check (difficulty between 1 and 10),
  created_at timestamptz default now()
);

-- Leads table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  email text,
  phone text,
  type text not null check (type in ('email', 'phone')),
  score int not null default 0,
  created_at timestamptz default now()
);

-- Indexes
create index idx_questions_difficulty on public.questions(difficulty);
create index idx_leaderboard_score on public.leaderboard(score desc);

-- Enable realtime on leaderboard
alter publication supabase_realtime add table public.leaderboard;

-- Enable RLS
alter table public.leaderboard enable row level security;
alter table public.questions enable row level security;
alter table public.leads enable row level security;

-- LEADERBOARD: public read and insert (no auth needed)
create policy "Leaderboard is publicly readable" on public.leaderboard
  for select using (true);

create policy "Anyone can add leaderboard entries" on public.leaderboard
  for insert with check (true);

-- QUESTIONS: public read, no client-side writes (seeded via API or dashboard)
create policy "Questions are publicly readable" on public.questions
  for select using (true);

-- LEADS: public insert
create policy "Anyone can create leads" on public.leads
  for insert with check (true);
