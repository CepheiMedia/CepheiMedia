/**
 * Admin Dashboard Types
 * Types specific to admin operations and views
 */

import type {
  Organization,
  Profile,
  Contract,
  ContractStatus,
  Deliverable,
  DeliverableStatus,
  DeliverableCategory,
  Package,
} from "./database";

// =============================================================================
// INQUIRY TYPES
// =============================================================================

export type InquiryStatus = "new" | "contacted" | "converted" | "declined";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  services_requested: string[] | null;
  budget_range: string | null;
  project_details: string | null;
  status: InquiryStatus;
  contacted_at: string | null;
  notes: string | null;
  converted_to_profile_id: string | null;
  created_at: string;
}

// =============================================================================
// EXTENDED ORGANIZATION TYPE
// =============================================================================

export interface OrganizationWithDetails extends Organization {
  industry: string | null;
  website: string | null;
  slug: string;
  _count?: {
    profiles: number;
    contracts: number;
  };
}

// =============================================================================
// EXTENDED PROFILE TYPE
// =============================================================================

export type ProfileStatus = "active" | "inactive" | "pending";

export interface ProfileWithDetails extends Profile {
  status: ProfileStatus;
  organization: OrganizationWithDetails | null;
}

// =============================================================================
// ADMIN DASHBOARD STATS
// =============================================================================

export interface AdminStats {
  totalClients: number;
  activeClients: number;
  pendingInquiries: number;
  activeContracts: number;
  totalRevenue: number;
  monthlyRecurring: number;
}

// =============================================================================
// RECENT ACTIVITY
// =============================================================================

export type ActivityType = "inquiry" | "client" | "contract" | "deliverable";

export interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

// =============================================================================
// ACTION RESULTS
// =============================================================================

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

// =============================================================================
// FORM DATA TYPES
// =============================================================================

export interface CreateOrganizationData {
  name: string;
  slug: string;
  industry?: string;
  website?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  industry?: string;
  website?: string;
}

export interface CreateClientData {
  email: string;
  password: string;
  full_name: string;
  organization_id: string;
}

export interface UpdateClientData {
  full_name?: string;
  status?: ProfileStatus;
  organization_id?: string;
}

export interface UpdateInquiryData {
  status?: InquiryStatus;
  notes?: string;
  contacted_at?: string;
}

export interface ConvertInquiryData {
  inquiry_id: string;
  organization: CreateOrganizationData;
  client: {
    email: string;
    password: string;
    full_name: string;
  };
}

export interface CreateContractData {
  organization_id: string;
  package_id: string;
  start_date: string;
  end_date?: string;
  monthly_ad_spend: number;
  extras?: { name: string; price: number }[];
  status?: ContractStatus;
}

export interface UpdateContractData {
  package_id?: string;
  start_date?: string;
  end_date?: string;
  monthly_ad_spend?: number;
  extras?: { name: string; price: number }[];
  status?: ContractStatus;
}

export interface CreateDeliverableData {
  organization_id: string;
  category_id: string;
  campaign_id?: string;
  title: string;
  description?: string;
  file_url?: string;
  external_url?: string;
  status?: DeliverableStatus;
}

export interface UpdateDeliverableData {
  category_id?: string;
  campaign_id?: string;
  title?: string;
  description?: string;
  file_url?: string;
  external_url?: string;
  status?: DeliverableStatus;
  delivered_at?: string;
}

// =============================================================================
// TABLE VIEW TYPES (with joins)
// =============================================================================

export interface ContractTableRow extends Contract {
  organization: Organization;
  package: Package;
}

export interface DeliverableTableRow extends Deliverable {
  organization: Organization;
  category: DeliverableCategory;
}

export interface ClientTableRow extends Profile {
  status: ProfileStatus;
  organization: Organization | null;
}
