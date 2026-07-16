create table public.ancestry_trees (
  user_id uuid primary key references auth.users(id) on delete cascade,
  root_id text,
  nodes jsonb not null default '[]'::jsonb,
  edges jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.ancestry_trees enable row level security;
create policy "own_select" on public.ancestry_trees for select using (auth.uid() = user_id);
create policy "own_insert" on public.ancestry_trees for insert with check (auth.uid() = user_id);
create policy "own_update" on public.ancestry_trees for update using (auth.uid() = user_id);
create policy "own_delete" on public.ancestry_trees for delete using (auth.uid() = user_id);