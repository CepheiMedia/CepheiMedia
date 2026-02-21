import { z } from "zod";

/**
 * Client Validation Schemas
 */

export const createClientSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be less than 72 characters"),
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  organization_id: z.string().uuid("Please select an organization"),
});

export const updateClientSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  organization_id: z.string().uuid("Invalid organization").optional(),
});

export const updateInquirySchema = z.object({
  status: z.enum(["new", "contacted", "converted", "declined"]).optional(),
  notes: z.string().max(5000, "Notes must be less than 5000 characters").optional(),
  contacted_at: z.string().datetime().optional(),
});

export const convertInquirySchema = z.object({
  inquiry_id: z.string().uuid("Invalid inquiry ID"),
  organization: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    slug: z
      .string()
      .min(2, "Slug must be at least 2 characters")
      .max(50, "Slug must be less than 50 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens"
      )
      .optional(),
    industry: z.string().max(50).optional(),
    website: z.string().url().optional().or(z.literal("")),
  }),
  client: z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be less than 72 characters"),
    full_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
  }),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type UpdateInquiryInput = z.infer<typeof updateInquirySchema>;
export type ConvertInquiryInput = z.infer<typeof convertInquirySchema>;
