-- Migration: Admin Dashboard Enhancements
-- Adds status tracking to inquiries, additional fields to organizations/profiles,
-- and RLS policies for admin operations

-- =============================================================================
-- INQUIRIES TABLE ENHANCEMENTS
-- Add status tracking for inquiry workflow
-- =============================================================================

-- Add status column with workflow states
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new'
  CHECK (status IN ('new', 'contacted', 'converted', 'declined'));

-- Add contacted timestamp
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMPTZ;

-- Add notes field for admin comments
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add converted_to_profile_id to track which client was created from this inquiry
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS converted_to_profile_id UUID REFERENCES profiles(id);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- =============================================================================
-- ORGANIZATIONS TABLE ENHANCEMENTS
-- Add industry and website fields
-- =============================================================================

ALTER TABLE organizations ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS website TEXT;

-- =============================================================================
-- PROFILES TABLE ENHANCEMENTS
-- Add status field for account state
-- =============================================================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'
  CHECK (status IN ('active', 'inactive', 'pending'));

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- =============================================================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable RLS on profiles if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- PROFILES POLICIES
-- Allow admins to insert new profiles (for client creation)
-- -----------------------------------------------------------------------------

-- Drop policy if exists (for re-running migration)
DROP POLICY IF EXISTS "admins_insert_profiles" ON profiles;

CREATE POLICY "admins_insert_profiles" ON profiles
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to update any profile
DROP POLICY IF EXISTS "admins_update_profiles" ON profiles;

CREATE POLICY "admins_update_profiles" ON profiles
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow users to read their own profile and admins to read all
DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;

CREATE POLICY "users_read_own_profile" ON profiles
  FOR SELECT USING (
    id = auth.uid() OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- ORGANIZATIONS POLICIES
-- Allow admins to insert and manage organizations
-- -----------------------------------------------------------------------------

-- Drop policy if exists
DROP POLICY IF EXISTS "admins_insert_orgs" ON organizations;

CREATE POLICY "admins_insert_orgs" ON organizations
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to update organizations
DROP POLICY IF EXISTS "admins_update_orgs" ON organizations;

CREATE POLICY "admins_update_orgs" ON organizations
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to delete organizations
DROP POLICY IF EXISTS "admins_delete_orgs" ON organizations;

CREATE POLICY "admins_delete_orgs" ON organizations
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow users to read their own organization and admins to read all
DROP POLICY IF EXISTS "users_read_own_org" ON organizations;

CREATE POLICY "users_read_own_org" ON organizations
  FOR SELECT USING (
    id = (SELECT organization_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- -----------------------------------------------------------------------------
-- INQUIRIES POLICIES
-- Allow admins to update inquiries (mark contacted, add notes, etc.)
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS "admins_update_inquiries" ON inquiries;

CREATE POLICY "admins_update_inquiries" ON inquiries
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to delete inquiries
DROP POLICY IF EXISTS "admins_delete_inquiries" ON inquiries;

CREATE POLICY "admins_delete_inquiries" ON inquiries
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
