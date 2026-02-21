-- Migration: Create packages, contracts, and billing tables
-- Phase 2: Client Dashboard + KPIs

-- =============================================================================
-- PACKAGES TABLE
-- Service tiers that organizations can subscribe to
-- =============================================================================
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  base_price DECIMAL(10, 2) NOT NULL,
  included_services JSONB NOT NULL DEFAULT '[]',
  portal_access_level TEXT NOT NULL DEFAULT 'standard',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for lookups
CREATE INDEX idx_packages_name ON packages(name);

-- =============================================================================
-- CONTRACTS TABLE
-- Links organizations to their subscribed package
-- =============================================================================
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE RESTRICT,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  monthly_ad_spend DECIMAL(10, 2) NOT NULL DEFAULT 0,
  extras JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT valid_date_range CHECK (end_date IS NULL OR end_date > start_date)
);

-- Create indexes for common queries
CREATE INDEX idx_contracts_organization_id ON contracts(organization_id);
CREATE INDEX idx_contracts_package_id ON contracts(package_id);
CREATE INDEX idx_contracts_status ON contracts(status);

-- =============================================================================
-- BILLING TABLE
-- Invoice records for organizations
-- =============================================================================
CREATE TABLE billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  package_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  ad_spend_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  extras_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total DECIMAL(10, 2) GENERATED ALWAYS AS (package_amount + ad_spend_amount + extras_amount) STORED,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
  invoice_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT valid_billing_period CHECK (period_end > period_start)
);

-- Create indexes for common queries
CREATE INDEX idx_billing_organization_id ON billing(organization_id);
CREATE INDEX idx_billing_status ON billing(status);
CREATE INDEX idx_billing_period ON billing(period_start, period_end);

-- =============================================================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- PACKAGES POLICIES
-- Everyone can read packages (public tier information)
-- Only admins can modify packages
-- -----------------------------------------------------------------------------
CREATE POLICY "packages_select_all"
  ON packages FOR SELECT
  USING (true);

CREATE POLICY "packages_admin_all"
  ON packages FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- CONTRACTS POLICIES
-- Clients can only view their organization's contracts
-- Admins have full access
-- -----------------------------------------------------------------------------
CREATE POLICY "contracts_select_own_org"
  ON contracts FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "contracts_admin_all"
  ON contracts FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- BILLING POLICIES
-- Clients can only view their organization's billing records
-- Admins have full access
-- -----------------------------------------------------------------------------
CREATE POLICY "billing_select_own_org"
  ON billing FOR SELECT
  USING (
    organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "billing_admin_all"
  ON billing FOR ALL
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
