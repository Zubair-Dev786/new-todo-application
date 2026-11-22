create table public.user_todos (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  text text not null
);


alter table public.user_todos disable row level security;