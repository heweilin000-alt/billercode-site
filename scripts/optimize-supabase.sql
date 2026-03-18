-- =============================================
-- Supabase Performance Optimizations
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Enable RLS with read-only public access
-- This ensures anon key can only SELECT, not INSERT/UPDATE/DELETE

alter table biller_codes enable row level security;
alter table blog_posts enable row level security;
alter table pages enable row level security;

-- Allow public read access
create policy "Public read access" on biller_codes for select using (true);
create policy "Public read access" on blog_posts for select using (true);
create policy "Public read access" on pages for select using (true);

-- 2. Add trigram index for faster ILIKE searches on merchant_name
-- This dramatically speeds up the RelatedBillers ilike query
create extension if not exists pg_trgm;
create index if not exists idx_biller_merchant_trgm on biller_codes using gin (merchant_name gin_trgm_ops);
create index if not exists idx_biller_merchant_short_trgm on biller_codes using gin (merchant_short_name gin_trgm_ops);
create index if not exists idx_biller_code_trgm on biller_codes using gin (biller_code gin_trgm_ops);

-- 3. Analyze tables to update query planner statistics
analyze biller_codes;
analyze blog_posts;
analyze pages;
