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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDeliverable } from "@/app/(admin)/admin/actions";

interface Organization {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Deliverable {
  id: string;
  organization_id: string;
  category_id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  external_url: string | null;
  status: "draft" | "in_review" | "delivered" | "archived";
  organization: Organization;
  category: Category;
}

interface EditDeliverableDialogProps {
  deliverable: Deliverable;
  organizations: Organization[];
  categories: Category[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditDeliverableDialog({
  deliverable,
  organizations,
  categories,
  open,
  onOpenChange,
}: EditDeliverableDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await updateDeliverable(deliverable.id, formData);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to update deliverable");
      return;
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Deliverable</DialogTitle>
          <DialogDescription>
            Update deliverable details for {deliverable.organization?.name}.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={deliverable.title}
              placeholder="Monthly Performance Report"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={deliverable.description || ""}
              placeholder="Brief description of this deliverable..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Organization</Label>
              <Input
                value={deliverable.organization?.name || "Unknown"}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Category *</Label>
              <Select
                name="category_id"
                defaultValue={deliverable.category_id}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">File URL</Label>
            <Input
              id="file_url"
              name="file_url"
              type="url"
              defaultValue={deliverable.file_url || ""}
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external_url">External URL</Label>
            <Input
              id="external_url"
              name="external_url"
              type="url"
              defaultValue={deliverable.external_url || ""}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={deliverable.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
