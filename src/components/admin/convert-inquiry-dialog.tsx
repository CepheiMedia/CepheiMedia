"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { convertInquiryToClient } from "@/app/(admin)/admin/actions";
import { generateSlug } from "@/lib/validations/organization";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
}

interface ConvertInquiryDialogProps {
  inquiry: Inquiry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConvertInquiryDialog({
  inquiry,
  open,
  onOpenChange,
}: ConvertInquiryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [orgName, setOrgName] = useState(inquiry.company || "");
  const [orgSlug, setOrgSlug] = useState(
    inquiry.company ? generateSlug(inquiry.company) : ""
  );

  const handleOrgNameChange = (value: string) => {
    setOrgName(value);
    setOrgSlug(generateSlug(value));
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await convertInquiryToClient(formData);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to convert inquiry");
      return;
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Convert to Client</DialogTitle>
          <DialogDescription>
            Create a new organization and client account from this inquiry.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="inquiry_id" value={inquiry.id} />

          {/* Organization Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Organization</h3>

            <div className="space-y-2">
              <Label htmlFor="org_name">Organization Name *</Label>
              <Input
                id="org_name"
                name="org_name"
                value={orgName}
                onChange={(e) => handleOrgNameChange(e.target.value)}
                placeholder="Acme Corp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="org_slug">Slug *</Label>
              <Input
                id="org_slug"
                name="org_slug"
                value={orgSlug}
                onChange={(e) => setOrgSlug(e.target.value)}
                placeholder="acme-corp"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="org_industry">Industry</Label>
                <Input
                  id="org_industry"
                  name="org_industry"
                  placeholder="Technology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org_website">Website</Label>
                <Input
                  id="org_website"
                  name="org_website"
                  type="url"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Client Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Client Account</h3>

            <div className="space-y-2">
              <Label htmlFor="client_name">Full Name *</Label>
              <Input
                id="client_name"
                name="client_name"
                defaultValue={inquiry.name}
                placeholder="John Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_email">Email Address *</Label>
              <Input
                id="client_email"
                name="client_email"
                type="email"
                defaultValue={inquiry.email}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_password">Password *</Label>
              <Input
                id="client_password"
                name="client_password"
                type="password"
                placeholder="Minimum 8 characters"
                minLength={8}
                required
              />
              <p className="text-xs text-muted-foreground">
                Share this password securely with the client.
              </p>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Converting..." : "Convert to Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
