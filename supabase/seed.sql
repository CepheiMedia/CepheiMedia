-- Seed Data for Development
-- Run with: npx supabase db reset

-- =============================================================================
-- PACKAGES
-- Three service tiers: Starter, Growth, Scale
-- =============================================================================
INSERT INTO packages (id, name, base_price, included_services, portal_access_level) VALUES
  (
    'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    'Starter',
    2500.00,
    '[
      "Brand strategy consultation",
      "Social media management (2 platforms)",
      "Monthly performance report",
      "Email support"
    ]'::jsonb,
    'basic'
  ),
  (
    'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e',
    'Growth',
    5000.00,
    '[
      "Brand strategy consultation",
      "Social media management (4 platforms)",
      "Paid advertising management",
      "Weekly performance reports",
      "Dedicated account manager",
      "Email & phone support",
      "A/B testing optimization"
    ]'::jsonb,
    'standard'
  ),
  (
    'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f',
    'Scale',
    10000.00,
    '[
      "Full brand strategy & positioning",
      "Social media management (all platforms)",
      "Advanced paid advertising (Meta, Google, TikTok)",
      "Real-time performance dashboard",
      "Dedicated account team",
      "Priority support (24/7)",
      "Custom landing pages",
      "Conversion rate optimization",
      "Monthly strategy sessions",
      "Competitor analysis reports"
    ]'::jsonb,
    'premium'
  );

-- =============================================================================
-- TEST ORGANIZATION
-- Acme Corp for development testing
-- =============================================================================
INSERT INTO organizations (id, name) VALUES
  ('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Acme Corp');

-- =============================================================================
-- TEST CONTRACT
-- Acme Corp on Growth plan
-- =============================================================================
INSERT INTO contracts (id, organization_id, package_id, start_date, monthly_ad_spend, extras, status) VALUES
  (
    'e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',  -- Acme Corp
    'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e',  -- Growth package
    '2024-10-01',
    3000.00,
    '[
      {"name": "Additional landing page", "price": 500}
    ]'::jsonb,
    'active'
  );

-- =============================================================================
-- TEST BILLING RECORDS
-- 2 paid invoices, 1 pending
-- =============================================================================
INSERT INTO billing (id, organization_id, period_start, period_end, package_amount, ad_spend_amount, extras_amount, status, invoice_url) VALUES
  (
    'f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    '2024-10-01',
    '2024-10-31',
    5000.00,
    3000.00,
    500.00,
    'paid',
    'https://invoice.stripe.com/i/acct_xxx/inv_oct2024'
  ),
  (
    'a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    '2024-11-01',
    '2024-11-30',
    5000.00,
    3000.00,
    500.00,
    'paid',
    'https://invoice.stripe.com/i/acct_xxx/inv_nov2024'
  ),
  (
    'b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    '2024-12-01',
    '2024-12-31',
    5000.00,
    3000.00,
    500.00,
    'pending',
    NULL
  );

-- =============================================================================
-- ROI BENCHMARKS
-- Industry average metrics for projections
-- =============================================================================
INSERT INTO roi_benchmarks (id, industry, platform, avg_cpl, avg_roas, avg_ctr, avg_cpc) VALUES
  (
    'c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f',
    'general',
    'all',
    35.00,
    2.90,
    0.0180,
    1.50
  ),
  (
    'd0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a',
    'ecommerce',
    'all',
    28.00,
    3.50,
    0.0220,
    1.20
  ),
  (
    'e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b',
    'saas',
    'all',
    85.00,
    4.20,
    0.0150,
    2.50
  );

-- =============================================================================
-- ROI PROJECTIONS
-- 3 months of projections for Acme Corp
-- =============================================================================
INSERT INTO roi_projections (id, organization_id, month, projected_leads, projected_spend, projected_roas, projected_cpl, projected_revenue, actual_leads, actual_spend, actual_roas, actual_cpl, actual_revenue) VALUES
  (
    'f2a3b4c5-d6e7-5f6a-9b0c-1d2e3f4a5b6c',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    '2024-10-01',
    86,
    3000.00,
    2.90,
    35.00,
    8700.00,
    92,
    2950.00,
    3.10,
    32.07,
    9145.00
  ),
  (
    'a3b4c5d6-e7f8-6a7b-0c1d-2e3f4a5b6c7d',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    '2024-11-01',
    86,
    3000.00,
    2.90,
    35.00,
    8700.00,
    78,
    3100.00,
    2.70,
    39.74,
    8370.00
  ),
  (
    'b4c5d6e7-f8a9-7b8c-1d2e-3f4a5b6c7d8e',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    '2024-12-01',
    86,
    3000.00,
    2.90,
    35.00,
    8700.00,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );

-- =============================================================================
-- DELIVERABLE CATEGORIES
-- Standard categories for agency deliverables
-- =============================================================================
INSERT INTO deliverable_categories (id, name, icon, sort_order) VALUES
  ('c5d6e7f8-a9b0-8c9d-2e3f-4a5b6c7d8e9f', 'Creative Assets', 'palette', 1),
  ('d6e7f8a9-b0c1-9d0e-3f4a-5b6c7d8e9f0a', 'Reports', 'chart', 2),
  ('e7f8a9b0-c1d2-0e1f-4a5b-6c7d8e9f0a1b', 'Strategy', 'lightbulb', 3),
  ('f8a9b0c1-d2e3-1f2a-5b6c-7d8e9f0a1b2c', 'Other', 'file', 4);

-- =============================================================================
-- TEST CAMPAIGNS
-- 2 manual campaigns for Acme Corp
-- =============================================================================
INSERT INTO campaigns (id, organization_id, name, platform, status, objective, start_date, spend, impressions, clicks, conversions, revenue) VALUES
  (
    'a9b0c1d2-e3f4-2a3b-6c7d-8e9f0a1b2c3d',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    'Holiday Sale 2024',
    'manual',
    'active',
    'Lead Generation',
    '2024-11-15',
    1500.00,
    45000,
    890,
    42,
    4200.00
  ),
  (
    'b0c1d2e3-f4a5-3b4c-7d8e-9f0a1b2c3d4e',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    'Brand Awareness Q4',
    'manual',
    'paused',
    'Brand Awareness',
    '2024-10-01',
    2200.00,
    125000,
    1850,
    28,
    2800.00
  );

-- =============================================================================
-- TEST DELIVERABLES
-- 3 deliverables across different categories
-- =============================================================================
INSERT INTO deliverables (id, organization_id, category_id, campaign_id, title, description, file_url, external_url, status, delivered_at) VALUES
  (
    'c1d2e3f4-a5b6-4c5d-8e9f-0a1b2c3d4e5f',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    'c5d6e7f8-a9b0-8c9d-2e3f-4a5b6c7d8e9f',
    'a9b0c1d2-e3f4-2a3b-6c7d-8e9f0a1b2c3d',
    'Holiday Campaign Ad Creatives',
    'Social media ad creatives for the Holiday Sale 2024 campaign. Includes 5 static images and 2 video assets.',
    'https://storage.example.com/deliverables/holiday-creatives.zip',
    NULL,
    'delivered',
    '2024-11-14 10:00:00+00'
  ),
  (
    'd2e3f4a5-b6c7-5d6e-9f0a-1b2c3d4e5f6a',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    'd6e7f8a9-b0c1-9d0e-3f4a-5b6c7d8e9f0a',
    NULL,
    'November 2024 Performance Report',
    'Monthly performance report covering all active campaigns, key metrics, and optimization recommendations.',
    NULL,
    'https://docs.google.com/document/d/example-report-nov-2024',
    'delivered',
    '2024-12-05 14:30:00+00'
  ),
  (
    'e3f4a5b6-c7d8-6e7f-0a1b-2c3d4e5f6a7b',
    'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a',
    'e7f8a9b0-c1d2-0e1f-4a5b-6c7d8e9f0a1b',
    NULL,
    'Q1 2025 Marketing Strategy',
    'Strategic recommendations for Q1 2025 including budget allocation, channel mix, and campaign calendar.',
    'https://storage.example.com/deliverables/q1-2025-strategy.pdf',
    NULL,
    'in_review',
    NULL
  );

-- =============================================================================
-- NOTE: Test user profile must be created manually or via auth signup
-- After signing up a test user, run:
--
-- UPDATE profiles
-- SET organization_id = 'd4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a'
-- WHERE email = 'your-test-email@example.com';
-- =============================================================================
