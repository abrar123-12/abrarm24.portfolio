-- migration-001: portfolio intro media
-- Supabase -> SQL Editor e paste kore RUN koro
-- bucket + table + RLS ekbare toiri hobe

-- 1) public storage bucket: media
insert into storage.buckets
  (id, name, public)
values
  ('media', 'media', true)
on conflict (id)
do nothing;

-- 2) table: site_media
create table if not exists
  public.site_media (
    id bigint
      generated always as identity
      primary key,
    kind text not null
      check (
        kind in ('video', 'audio', 'photo')
      ),
    file_path text not null,
    public_url text not null,
    created_at timestamptz not null
      default now()
  );

create index if not exists
  site_media_kind_created_idx
on public.site_media
  (kind, created_at desc);

-- 3) RLS on
alter table public.site_media
  enable row level security;

-- 4) public read (shobai dekhte parbe)
drop policy if exists
  "site_media public read"
on public.site_media;

create policy
  "site_media public read"
on public.site_media
for select
using (true);

-- 5) owner insert (login kora user)
drop policy if exists
  "site_media owner insert"
on public.site_media;

create policy
  "site_media owner insert"
on public.site_media
for insert
with check (
  auth.role() = 'authenticated'
);

-- 6) owner update
drop policy if exists
  "site_media owner update"
on public.site_media;

create policy
  "site_media owner update"
on public.site_media
for update
using (
  auth.role() = 'authenticated'
)
with check (
  auth.role() = 'authenticated'
);

-- 7) owner delete
drop policy if exists
  "site_media owner delete"
on public.site_media;

create policy
  "site_media owner delete"
on public.site_media
for delete
using (
  auth.role() = 'authenticated'
);

-- 8) storage: public read
drop policy if exists
  "media public read"
on storage.objects;

create policy
  "media public read"
on storage.objects
for select
using (
  bucket_id = 'media'
);

-- 9) storage: owner upload
drop policy if exists
  "media owner insert"
on storage.objects;

create policy
  "media owner insert"
on storage.objects
for insert
with check (
  bucket_id = 'media'
  and auth.role() = 'authenticated'
);

-- 10) storage: owner update
drop policy if exists
  "media owner update"
on storage.objects;

create policy
  "media owner update"
on storage.objects
for update
using (
  bucket_id = 'media'
  and auth.role() = 'authenticated'
)
with check (
  bucket_id = 'media'
  and auth.role() = 'authenticated'
);

-- 11) storage: owner delete
drop policy if exists
  "media owner delete"
on storage.objects;

create policy
  "media owner delete"
on storage.objects
for delete
using (
  bucket_id = 'media'
  and auth.role() = 'authenticated'
);

-- sesh. ekhn Authentication e
-- nijer user toiri koro (README dekho)
