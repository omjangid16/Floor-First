-- ─── Customer profile ───────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  username text,
  avatar_url text,
  updated_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

create policy "Shoppers can view their own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

create policy "Shoppers can create their own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create policy "Shoppers can update their own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

-- Keep the profile row in step with the account it belongs to.
create or replace function public.handle_new_customer()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, username)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'username'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_customer_created on auth.users;
create trigger on_customer_created
  after insert on auth.users
  for each row execute function public.handle_new_customer();

-- ─── Wishlist ───────────────────────────────────────────────────
create table public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.wishlist TO authenticated;
GRANT ALL ON public.wishlist TO service_role;

ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

create policy "Shoppers can view their own wishlist"
  on public.wishlist for select to authenticated
  using (auth.uid() = user_id);

create policy "Shoppers can add to their own wishlist"
  on public.wishlist for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Shoppers can remove from their own wishlist"
  on public.wishlist for delete to authenticated
  using (auth.uid() = user_id);

-- ─── Delivery addresses ────────────────────────────────────────
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  label text not null default 'Home',
  recipient_name text not null,
  phone text,
  line1 text not null,
  line2 text,
  city text not null default 'Dubai',
  emirate text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

create policy "Shoppers can view their own addresses"
  on public.addresses for select to authenticated
  using (auth.uid() = user_id);

create policy "Shoppers can add their own addresses"
  on public.addresses for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Shoppers can update their own addresses"
  on public.addresses for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Shoppers can delete their own addresses"
  on public.addresses for delete to authenticated
  using (auth.uid() = user_id);

-- ─── Orders ────────────────────────────────────────────────────
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'processing',
  subtotal numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  currency text not null default 'AED',
  placed_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

create policy "Shoppers can view their own orders"
  on public.orders for select to authenticated
  using (auth.uid() = user_id);

create policy "Shoppers can place their own orders"
  on public.orders for insert to authenticated
  with check (auth.uid() = user_id);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  image text,
  area numeric(10,2) not null default 0,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null default 0,
  installation boolean not null default false
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

create policy "Shoppers can view items in their own orders"
  on public.order_items for select to authenticated
  using (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  ));

create policy "Shoppers can add items to their own orders"
  on public.order_items for insert to authenticated
  with check (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  ));

-- ─── Saved basket ──────────────────────────────────────────────
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id text not null,
  area numeric(10,2) not null default 0,
  installation boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart_items TO authenticated;
GRANT ALL ON public.cart_items TO service_role;

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

create policy "Shoppers can view their own basket"
  on public.cart_items for select to authenticated
  using (auth.uid() = user_id);

create policy "Shoppers can add to their own basket"
  on public.cart_items for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Shoppers can change their own basket"
  on public.cart_items for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Shoppers can clear their own basket"
  on public.cart_items for delete to authenticated
  using (auth.uid() = user_id);
