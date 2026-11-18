-- Ejecutar una sola vez en el SQL Editor del proyecto de Supabase.
-- Requiere las tablas existentes public.rooms y public.messages y sus políticas RLS.
begin;

do $$
begin
  if exists (
    select 1 from pg_class
    where oid in ('public.rooms'::regclass, 'public.messages'::regclass, 'storage.objects'::regclass)
      and not relrowsecurity
  ) then
    raise exception 'RLS must be enabled on rooms, messages and storage.objects';
  end if;
end;
$$;

alter table public.messages add column image_path text;
alter table public.messages add constraint chat_image_path_matches_message check (
  image_path is null or (
    split_part(image_path, '/', 1) = room_id::text
    and split_part(image_path, '/', 2) = user_id::text
    and image_path ~ '^[^/]+/[^/]+/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[.](jpg|png|webp)$'
  )
);
create unique index chat_messages_image_path_unique on public.messages (image_path)
  where image_path is not null;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('chat-images', 'chat-images', false, 6291456, array['image/jpeg', 'image/png', 'image/webp']);

-- La comprobación de existencia se ejecuta sin las políticas de lectura del bucket.
-- Se aplica mediante un trigger y no se expone como RPC.
create function public.check_chat_image_object() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.image_path is not null and not exists (
    select 1 from storage.objects obj
    where obj.bucket_id = 'chat-images' and obj.name = new.image_path
      and obj.owner_id = new.user_id::text
  ) then
    raise exception 'El adjunto del mensaje no existe o pertenece a otro usuario';
  end if;
  return new;
end;
$$;
revoke all on function public.check_chat_image_object() from public, anon, authenticated;

create trigger check_chat_image_object
before insert or update of image_path, room_id, user_id on public.messages
for each row execute function public.check_chat_image_object();

-- Estas políticas restrictivas complementan las políticas existentes del chat.
create policy "chat image message insert" on public.messages
as restrictive for insert to public
with check (
  image_path is null or (
    (select auth.uid()) = user_id
    and exists (select 1 from public.rooms r where r.id = messages.room_id)
  )
);

create policy "chat image message update" on public.messages
as restrictive for update to public
using (image_path is null or (select auth.uid()) = user_id)
with check (
  image_path is null or (
    (select auth.uid()) = user_id
    and exists (select 1 from public.rooms r where r.id = messages.room_id)
  )
);

-- La política permisiva habilita la operación. La restrictiva exige el
-- alcance de la sala aun cuando existan políticas permisivas más amplias.
create policy "chat image bucket upload" on storage.objects
for insert to authenticated with check (bucket_id = 'chat-images');

create policy "chat image upload scope" on storage.objects
as restrictive for insert to public with check (
  bucket_id <> 'chat-images' or (
    (select auth.uid()) is not null
    and split_part(name, '/', 2) = (select auth.uid())::text
    and name ~ '^[^/]+/[^/]+/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[.](jpg|png|webp)$'
    and exists (select 1 from public.rooms r where r.id::text = split_part(storage.objects.name, '/', 1))
  )
);

create policy "chat image bucket read" on storage.objects
for select to authenticated using (bucket_id = 'chat-images');

create policy "chat image read scope" on storage.objects
as restrictive for select to public using (
  bucket_id <> 'chat-images' or (
    (select auth.uid()) is not null
    and exists (
      select 1 from public.messages m
      join public.rooms r on r.id = m.room_id
      where m.image_path = storage.objects.name
    )
  )
);

create policy "chat image bucket immutable" on storage.objects
as restrictive for update to public
using (bucket_id <> 'chat-images') with check (bucket_id <> 'chat-images');

create policy "chat image bucket client delete denied" on storage.objects
as restrictive for delete to public using (bucket_id <> 'chat-images');

commit;
