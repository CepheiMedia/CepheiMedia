-- Migration: Create ROI, campaigns, and deliverables tables
-- Phase 3: ROI, Campaigns & Deliverables

-- =============================================================================
-- ROI BENCHMARKS TABLE
-- Industry averages for projections
-- =============================================================================
CREATE TABLE roi_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry TEXT NOT NULL,
  platform TEXT NOT NULL,
  avg_cpl DECIMAL(10, 2) NOT NULL,
  avg_roas DECIMAL(5, 2) NOT NULL,
  avg_ctr DECIMAL(5, 4),
  avg_cpc DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT unique_industry_platform UNIQUE (industry, platform)
);

-- Create index for lookups
CREATE INDEX idx_roi_benchmarks_industry ON roi_benchmarks(industry);

-- =============================================================================
-- ROI PROJECTIONS TABLE
-- Monthly projections vs actuals for organizations
-- =============================================================================
CREATE TABLE roi_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  projected_leads INTEGER NOT NULL DEFAULT 0,
  projected_spend DECIMAL(10, 2) NOT NULL DEFAULT 0,
  projected_roas DECIMAL(5, 2) NOT NULL DEFAULT 0,
  projected_cpl DECIMAL(10, 2) NOT NULL DEFAULT 0,
  projected_revenue DECIMAL(12, 2) NOT NULL DEFAULT 0,
  actual_leads INTEGER,
  actual_spend DECIMAL(10, 2),
  actual_roas DECIMAL(5, 2),
  actual_cpl DECIMAL(10, 2),
  actual_revenue DECIMAL(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT unique_org_month UNIQUE (organization_id, month)
);

-- Create indexes for common queries
CREATE INDEX idx_roi_projections_organization_id ON roi_projections(organization_id);
CREATE INDEX idx_roi_projections_month ON roi_projections(month);

-- =============================================================================
-- AD ACCOUNTS TABLE
-- Connected advertising platforms
-- =============================================================================
CREATE TABLE ad_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'tiktok', 'manual')),
  account_id TEXT,
  account_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('connected', 'pending', 'disconnected', 'error')),
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT unique_org_platform_account UNIQUE (organization_id, platform, account_id)
);

-- Create indexes for common queries
CREATE INDEX idx_ad_accounts_organization_id ON ad_accounts(organization_id);
CREATE INDEX idx_ad_accounts_platform ON ad_accounts(platform);
CREATE INDEX idx_ad_accounts_status ON ad_accounts(status);

-- =============================================================================
-- CAMPAIGNS TABLE
-- Ad campaigns across platforms
-- =============================================================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ad_account_id UUID REFERENCES ad_accounts(id) ON DELETE SET NULL,
  external_id TEXT,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'tiktok', 'manual')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'draft')),
  objective TEXT,
  start_date DATE,
  end_date DATE,
  spend DECIMAL(10, 2) NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  revenue DECIMAL(12, 2) NOT NULL DEFAULT 0,
  -- Computed metrics
  ctr DECIMAL(8, 4) GENERATED ALWAYS AS (
    CASE WHEN impressions > 0 THEN (clicks::DECIMAL / impressions) * 100 ELSE 0 END
  ) STORED,
  cpc DECIMAL(10, 2) GENERATED ALWAYS AS (
    CASE WHEN clicks > 0 THEN spend / clicks ELSE 0 END
  ) STORED,
  cpl DECIMAL(10, 2) GENERATED ALWAYS AS (
    CASE WHEN conversions > 0 THEN spend / conversions ELSE 0 END
  ) STORED,
  roas DECIMAL(8, 2) GENERATED ALWAYS AS (
    CASE WHEN spend > 0 THEN revenue / spend ELSE 0 END
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX idx_campaigns_organization_id ON campaigns(organization_id);
CREATE INDEX idx_campaigns_ad_account_id ON campaigns(ad_account_id);
CREATE INDEX idx_campaigns_platform ON campaigns(platform);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- =============================================================================
-- DELIVERABLE CATEGORIES TABLE
-- Category lookup for deliverables
-- =============================================================================
CREATE TABLE deliverable_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'file',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for sorting
CREATE INDEX idx_deliverable_categories_sort ON deliverable_categories(sort_order);

-- =============================================================================
-- DELIVERABLES TABLE
-- Agency work product delivered to clients
-- =============================================================================
CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES deliverable_categories(id) ON DELETE RESTRICT,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  external_url TEXT,
  status TEXT NOT NULL DEFAULT 'delivered' CHECK (status IN ('draft', 'in_review', 'delivered', 'archived')),
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX idx_deliverables_organization_id ON deliverables(organization_id);
CREATE INDEX idx_deliverables_category_id ON deliverables(category_id);
CREATE INDEX idx_deliverables_campaign_id ON deliverables(campaign_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);

-- =============================================================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE roi_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- ROI BENCHMARKS POLICIES
-- Everyone can read benchmarks (public industry data)
-- Only admins can modify benchmarks
-- -----------------------------------------------------------------------------
CREATE POLICY "roi_benchmarks_select_all"
  ON roi_benchmarks FOR SELECT
  USING (true);

CREATE POLICY "roi_benchmarks_admin_all"
  ON roi_benchmarks FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- ROI PROJECTIONS POLICIES
-- Clients can only view their organization's projections
-- Admins have full access
-- -----------------------------------------------------------------------------
CREATE POLICY "roi_projections_select_own_org"
  ON roi_projections FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "roi_projections_admin_all"
  ON roi_projections FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- AD ACCOUNTS POLICIES
-- Clients can only view their organization's ad accounts
-- Admins have full access
-- -----------------------------------------------------------------------------
CREATE POLICY "ad_accounts_select_own_org"
  ON ad_accounts FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "ad_accounts_admin_all"
  ON ad_accounts FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- CAMPAIGNS POLICIES
-- Clients can only view their organization's campaigns
-- Admins have full access
-- -----------------------------------------------------------------------------
CREATE POLICY "campaigns_select_own_org"
  ON campaigns FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "campaigns_admin_all"
  ON campaigns FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- DELIVERABLE CATEGORIES POLICIES
-- Everyone can read categories
-- Only admins can modify categories
-- -----------------------------------------------------------------------------
CREATE POLICY "deliverable_categories_select_all"
  ON deliverable_categories FOR SELECT
  USING (true);

CREATE POLICY "deliverable_categories_admin_all"
  ON deliverable_categories FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- DELIVERABLES POLICIES
-- Clients can only view their organization's deliverables
-- Admins have full access
-- -----------------------------------------------------------------------------
CREATE POLICY "deliverables_select_own_org"
  ON deliverables FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "deliverables_admin_all"
  ON deliverables FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
