-- Biller Codes table (~30,585 records)
create table biller_codes (
  id serial primary key,
  slug text unique not null,
  title text not null,
  biller_code text not null,
  merchant_name text not null default '',
  merchant_short_name text default '',
  payment_methods text default '',
  payment_method_2 text default '',
  payment_method_3 text default '',
  payment_method_4 text default '',
  yoast_title text default '',
  yoast_desc text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_biller_slug on biller_codes(slug);
create index idx_biller_code on biller_codes(biller_code);
create index idx_biller_merchant on biller_codes(merchant_name);
create index idx_biller_merchant_short on biller_codes(merchant_short_name);

-- Full-text search index
alter table biller_codes add column fts tsvector
  generated always as (
    to_tsvector('english',
      coalesce(biller_code, '') || ' ' ||
      coalesce(merchant_name, '') || ' ' ||
      coalesce(merchant_short_name, '')
    )
  ) stored;
create index idx_biller_fts on biller_codes using gin(fts);

-- Blog posts table (8 posts)
create table blog_posts (
  id serial primary key,
  slug text unique not null,
  title text not null,
  url text,
  date timestamptz,
  modified timestamptz,
  content text,
  excerpt text,
  categories jsonb default '[]',
  tags jsonb default '[]',
  yoast_title text default '',
  yoast_desc text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_blog_slug on blog_posts(slug);

-- Pages table (7 pages)
create table pages (
  id serial primary key,
  slug text unique not null,
  title text not null,
  content text,
  yoast_title text default '',
  yoast_desc text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_pages_slug on pages(slug);
