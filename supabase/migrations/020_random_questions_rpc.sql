-- RPC for fetching randomly ordered questions, avoiding the fixed-pool
-- problem caused by Supabase's default insertion-order row return.
create or replace function get_random_questions(
  p_difficulty int,
  p_count int,
  p_category text default null,
  p_exclude text[] default '{}'
)
returns setof questions
language sql
stable
as $$
  select * from questions
  where difficulty = p_difficulty
    and (p_category is null or category = p_category)
    and (array_length(p_exclude, 1) is null or text != all(p_exclude))
  order by random()
  limit p_count;
$$;
