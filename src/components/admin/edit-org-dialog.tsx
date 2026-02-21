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
import { updateOrganization } from "@/app/(admin)/admin/actions";

interface Organization {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  website: string | null;
}

interface EditOrgDialogProps {
  organization: Organization;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditOrgDialog({
  organization,
  open,
  onOpenChange,
}: EditOrgDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await updateOrganization(organization.id, formData);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to update organization");
      return;
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription>
            Update organization details. Slug cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={organization.name}
              placeholder="Acme Corp"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={organization.slug}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Slug cannot be changed after creation.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              defaultValue={organization.industry || ""}
              placeholder="Technology, Healthcare, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              defaultValue={organization.website || ""}
              placeholder="https://example.com"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
