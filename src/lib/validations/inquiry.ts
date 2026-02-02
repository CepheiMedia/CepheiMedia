import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(200).optional().or(z.literal("")),
  services: z.enum(["dtm", "ddm", "both"], {
    message: "Please select a service",
  }),
  budget: z.enum(["starter", "growth", "scale"], {
    message: "Please select a budget range",
  }),
  details: z.string().max(5000).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
