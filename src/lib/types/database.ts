/**
 * Database Types for Supabase Tables
 * Phase 2: Packages, Contracts, and Billing
 */

// =============================================================================
// PACKAGE TYPES
// =============================================================================

export type PortalAccessLevel = "basic" | "standard" | "premium";

export interface Package {
  id: string;
  name: string;
  base_price: number;
  included_services: string[];
  portal_access_level: PortalAccessLevel;
  created_at: string;
}

// =============================================================================
// CONTRACT TYPES
// =============================================================================

export type ContractStatus = "active" | "paused" | "cancelled" | "expired";

export interface ContractExtra {
  name: string;
  price: number;
}

export interface Contract {
  id: string;
  organization_id: string;
  package_id: string;
  start_date: string;
  end_date: string | null;
  monthly_ad_spend: number;
  extras: ContractExtra[];
  status: ContractStatus;
  created_at: string;
}

// Contract with joined package data
export interface ContractWithPackage extends Contract {
  package: Package;
}

// =============================================================================
// BILLING TYPES
// =============================================================================

export type BillingStatus = "paid" | "pending" | "overdue";

export interface Billing {
  id: string;
  organization_id: string;
  period_start: string;
  period_end: string;
  package_amount: number;
  ad_spend_amount: number;
  extras_amount: number;
  total: number;
  status: BillingStatus;
  invoice_url: string | null;
  created_at: string;
}

// =============================================================================
// ORGANIZATION TYPES
// =============================================================================

export interface Organization {
  id: string;
  name: string;
  created_at: string;
}

// =============================================================================
// PROFILE TYPES
// =============================================================================

export type UserRole = "admin" | "client";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  organization_id: string | null;
  created_at: string;
}

// Profile with joined organization data
export interface ProfileWithOrganization extends Profile {
  organization: Organization | null;
}

// =============================================================================
// DASHBOARD AGGREGATES
// =============================================================================

export interface DashboardKPIs {
  monthlyBudget: number | null;
  totalBilled: number;
  pendingBalance: number;
  invoiceCount: number;
}

export interface BillingSummary {
  totalPaid: number;
  totalPending: number;
  invoiceCount: number;
}

// =============================================================================
// ROI TYPES
// =============================================================================

export interface RoiProjection {
  id: string;
  organization_id: string;
  month: string;
  projected_leads: number;
  projected_spend: number;
  projected_roas: number;
  projected_cpl: number;
  projected_revenue: number;
  actual_leads: number | null;
  actual_spend: number | null;
  actual_roas: number | null;
  actual_cpl: number | null;
  actual_revenue: number | null;
  created_at: string;
  updated_at: string;
}

export interface RoiBenchmark {
  id: string;
  industry: string;
  platform: string;
  avg_cpl: number;
  avg_roas: number;
  avg_ctr: number | null;
  avg_cpc: number | null;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// CAMPAIGN TYPES
// =============================================================================

export type AdPlatform = "meta" | "google" | "tiktok" | "manual";
export type AdAccountStatus = "connected" | "pending" | "disconnected" | "error";
export type CampaignStatus = "active" | "paused" | "completed" | "draft";

export interface AdAccount {
  id: string;
  organization_id: string;
  platform: AdPlatform;
  account_id: string | null;
  account_name: string;
  status: AdAccountStatus;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  organization_id: string;
  ad_account_id: string | null;
  external_id: string | null;
  name: string;
  platform: AdPlatform;
  status: CampaignStatus;
  objective: string | null;
  start_date: string | null;
  end_date: string | null;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpl: number;
  roas: number;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// DELIVERABLE TYPES
// =============================================================================

export type DeliverableStatus = "draft" | "in_review" | "delivered" | "archived";

export interface DeliverableCategory {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface Deliverable {
  id: string;
  organization_id: string;
  category_id: string;
  campaign_id: string | null;
  title: string;
  description: string | null;
  file_url: string | null;
  external_url: string | null;
  status: DeliverableStatus;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

// Deliverable with joined category data
export interface DeliverableWithCategory extends Deliverable {
  category: DeliverableCategory;
}

// =============================================================================
// ROI DASHBOARD AGGREGATES
// =============================================================================

export interface RoiKPIs {
  projectedRoas: number | null;
  projectedCpl: number | null;
  estimatedMonthlyLeads: number | null;
  projectedRevenue: number | null;
}

export interface CampaignSummary {
  activeCampaigns: number;
  totalSpend: number;
  totalConversions: number;
  avgRoas: number;
}
