-- ============================================================
-- NOURYA — Schéma initial de la base de données
-- Version: 001
-- Description: Tables produits, commandes, profils, favoris,
--              annonces et paramètres du site
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  phone text,
  wilaya text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can view and update own profile" on profiles
  for all using (auth.uid() = id);

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_ar text,
  description text,
  description_ar text,
  long_desc text,
  images text[] default '{}',
  image_url text,
  price numeric(10,2),
  formats jsonb default '[]',
  category text,
  badge text,
  tags text[],
  benefits text[],
  usage_instructions text[],
  ingredients text[],
  stock_status text default 'in_stock' check (stock_status in ('in_stock','out_of_stock','low_stock')),
  visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table products enable row level security;
create policy "Anyone can read visible products" on products
  for select using (visible = true);
create policy "Admin can manage products" on products
  for all using (auth.jwt()->>'role' = 'admin');

-- ============================================================
-- ORDERS
-- ============================================================
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  email text,
  phone text not null,
  address text not null,
  wilaya text not null,
  items jsonb not null default '[]',
  subtotal numeric(10,2) default 0,
  total numeric(10,2) not null,
  payment_method text not null,
  payment_status text default 'pending' check (payment_status in ('pending','confirmed','failed','refunded')),
  delivery_status text default 'pending' check (delivery_status in ('pending','processing','shipped','delivered','cancelled')),
  notes text,
  admin_notes text,
  created_at timestamptz default now()
);
alter table orders enable row level security;
create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);
create policy "Guests can insert orders" on orders
  for insert with check (true);
create policy "Admin can manage all orders" on orders
  for all using (auth.jwt()->>'role' = 'admin');

-- ============================================================
-- FAVORITES
-- ============================================================
create table if not exists favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id text not null,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);
alter table favorites enable row level security;
create policy "Users manage own favorites" on favorites
  for all using (auth.uid() = user_id);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
create table if not exists announcements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text,
  type text default 'info' check (type in ('promo','info','alert')),
  active boolean default true,
  created_at timestamptz default now()
);
alter table announcements enable row level security;
create policy "Anyone can read active announcements" on announcements
  for select using (active = true);
create policy "Admin can manage announcements" on announcements
  for all using (auth.jwt()->>'role' = 'admin');

-- ============================================================
-- SITE SETTINGS
-- ============================================================
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);
alter table site_settings enable row level security;
create policy "Anyone can read settings" on site_settings
  for select using (true);
create policy "Admin can manage settings" on site_settings
  for all using (auth.jwt()->>'role' = 'admin');

-- Default settings
insert into site_settings (key, value) values
  ('whatsapp_number', '213XXXXXXXXX'),
  ('instagram_url', 'https://instagram.com/nourya.dz'),
  ('ccp_number', 'XXXXXXXXX CLE XX'),
  ('cib_rib', 'XXXX XXXX XXXX XXXX XXXX'),
  ('baridimob_number', '00799XXXXXXXX'),
  ('admin_email', 'admin@nourya.dz'),
  ('delivery_info', 'Livraison incluse dans le prix. Délai: 3-7 jours ouvrables.')
on conflict (key) do nothing;

-- ============================================================
-- FUNCTION: auto-create profile on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- STORAGE: product images bucket
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Anyone can view product images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "Admin can upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' AND auth.jwt()->>'role' = 'admin');
create policy "Admin can update product images" on storage.objects
  for update using (bucket_id = 'product-images' AND auth.jwt()->>'role' = 'admin');
create policy "Admin can delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' AND auth.jwt()->>'role' = 'admin');
