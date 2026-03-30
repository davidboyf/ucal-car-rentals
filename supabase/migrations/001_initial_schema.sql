-- ─────────────────────────────────────────────────────────────
-- Ucal Car Rentals — Initial Schema
-- Run this in Supabase SQL Editor after creating your project
-- ─────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- VEHICLES
-- ─────────────────────────────────────────────────────────────
create table public.vehicles (
  id            text primary key,
  name          text not null,
  category      text not null check (category in ('economy','compact','suv','luxury','van','pickup')),
  image_url     text,
  price_per_day numeric(10,2) not null,
  seats         int not null,
  luggage       int not null,
  transmission  text not null check (transmission in ('automatic','manual')),
  fuel_type     text not null check (fuel_type in ('gasoline','diesel','hybrid','electric')),
  ac            boolean default true,
  features      text[] default '{}',
  available     boolean default true,
  description   text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- BLOCKED DATES (per vehicle unavailability)
-- ─────────────────────────────────────────────────────────────
create table public.vehicle_blocked_dates (
  id          uuid primary key default gen_random_uuid(),
  vehicle_id  text references public.vehicles(id) on delete cascade,
  blocked_from date not null,
  blocked_to   date not null,
  reason       text,
  created_at   timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- BOOKINGS
-- ─────────────────────────────────────────────────────────────
create table public.bookings (
  id                 uuid primary key default gen_random_uuid(),
  reference          text unique not null default 'UCL-' || upper(substr(gen_random_uuid()::text, 1, 6)),
  vehicle_id         text references public.vehicles(id),
  pickup_location    text not null,
  return_location    text not null,
  pickup_date        date not null,
  return_date        date not null,
  pickup_time        time not null,
  return_time        time not null,
  days               int generated always as (return_date - pickup_date) stored,
  subtotal           numeric(10,2),
  deposit            numeric(10,2),
  total              numeric(10,2),
  first_name         text not null,
  last_name          text not null,
  email              text not null,
  phone              text not null,
  driver_license     text not null,
  special_requests   text,
  status             text not null default 'pending'
                     check (status in ('pending','confirmed','cancelled','completed','no_show')),
  notes              text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- CHARTER REQUESTS
-- ─────────────────────────────────────────────────────────────
create table public.charter_requests (
  id                 uuid primary key default gen_random_uuid(),
  reference          text unique not null default 'CHT-' || upper(substr(gen_random_uuid()::text, 1, 6)),
  service_type       text not null check (service_type in (
                       'airport-transfer','wedding','corporate','tour','special-event'
                     )),
  pickup_location    text not null,
  destination        text not null,
  date               date not null,
  time               time not null,
  passengers         int not null default 1,
  vehicle_preference text,
  first_name         text not null,
  last_name          text not null,
  email              text not null,
  phone              text not null,
  notes              text,
  status             text not null default 'new'
                     check (status in ('new','quoted','confirmed','cancelled','completed')),
  quoted_price       numeric(10,2),
  admin_notes        text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- CONTACT MESSAGES
-- ─────────────────────────────────────────────────────────────
create table public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  last_name   text,
  email       text not null,
  phone       text,
  subject     text not null,
  message     text not null,
  status      text not null default 'unread'
              check (status in ('unread','read','replied','archived')),
  admin_reply text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- SEED VEHICLES (mirrors src/lib/data.ts)
-- ─────────────────────────────────────────────────────────────
insert into public.vehicles (id, name, category, image_url, price_per_day, seats, luggage, transmission, fuel_type, ac, features, available, description) values
  ('toyota-yaris',    'Toyota Yaris',           'economy', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',  45,  5, 2, 'automatic', 'gasoline', true, '{"Bluetooth","USB Port","Backup Camera","Air Conditioning"}', true, 'Perfect for solo travelers or couples exploring the island. Fuel-efficient and easy to park.'),
  ('honda-civic',     'Honda Civic',            'compact', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',  60,  5, 3, 'automatic', 'gasoline', true, '{"Bluetooth","Apple CarPlay","Backup Camera","Cruise Control"}', true, 'Comfortable and reliable for longer drives across Jamaica. Ideal for small families.'),
  ('toyota-rav4',     'Toyota RAV4',            'suv',     'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',  95,  5, 4, 'automatic', 'gasoline', true, '{"4WD","Apple CarPlay","Android Auto","Sunroof","Heated Seats"}', true, 'Tackle any terrain — from mountain roads to beach tracks.'),
  ('honda-crv',       'Honda CR-V',             'suv',     'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&q=80',  90,  5, 4, 'automatic', 'gasoline', true, '{"AWD","Backup Camera","Apple CarPlay","Blind Spot Monitoring"}', true, 'Spacious, smooth, and dependable. Great for families with extra luggage.'),
  ('toyota-hiace',    'Toyota HiAce Van',       'van',     'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',  130, 12, 8, 'manual',    'diesel',   true, '{"Large Cargo Space","Air Conditioning","USB Ports","Tinted Windows"}', true, 'Perfect for large groups, wedding parties, or corporate teams.'),
  ('mercedes-e-class','Mercedes-Benz E-Class',  'luxury',  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', 180,  5, 3, 'automatic', 'gasoline', true, '{"Premium Sound","Leather Seats","Panoramic Sunroof","Driver Assistance","Climate Control"}', true, 'Arrive in style. Our flagship luxury sedan for executives and special occasions.'),
  ('bmw-5-series',    'BMW 5 Series',           'luxury',  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',  200,  5, 3, 'automatic', 'gasoline', true, '{"M Sport Package","Harman Kardon Audio","Heated Seats","Head-Up Display","360 Camera"}', true, 'The ultimate driving machine. Precision engineering meets Jamaican paradise.'),
  ('toyota-hilux',    'Toyota Hilux',           'pickup',  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',  110,  5, 6, 'automatic', 'diesel',   true, '{"4x4","Tow Package","Bed Liner","Air Conditioning","Bluetooth"}', true, 'Built for Jamaica''s rugged terrain. Haul equipment, luggage, or gear with ease.');

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────
alter table public.vehicles              enable row level security;
alter table public.vehicle_blocked_dates enable row level security;
alter table public.bookings              enable row level security;
alter table public.charter_requests      enable row level security;
alter table public.contact_messages      enable row level security;

-- Public can read vehicles
create policy "vehicles_public_read" on public.vehicles
  for select using (true);

-- Public can insert bookings, charter requests, contact messages
create policy "bookings_public_insert" on public.bookings
  for insert with check (true);

create policy "charter_public_insert" on public.charter_requests
  for insert with check (true);

create policy "contact_public_insert" on public.contact_messages
  for insert with check (true);

-- Service role (admin API) can do everything — enforced via SUPABASE_SERVICE_ROLE_KEY
-- No extra policies needed; service role bypasses RLS

-- ─────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at
-- ─────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_updated_at         before update on public.bookings         for each row execute function public.set_updated_at();
create trigger charter_updated_at          before update on public.charter_requests for each row execute function public.set_updated_at();
create trigger contact_updated_at          before update on public.contact_messages  for each row execute function public.set_updated_at();
create trigger vehicles_updated_at         before update on public.vehicles          for each row execute function public.set_updated_at();
