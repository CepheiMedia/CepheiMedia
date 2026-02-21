"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { createDeliverable } from "@/app/(admin)/admin/actions";

interface Organization {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CreateDeliverableDialogProps {
  organizations: Organization[];
  categories: Category[];
}

export function CreateDeliverableDialog({
  organizations,
  categories,
}: CreateDeliverableDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await createDeliverable(formData);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to create deliverable");
      return;
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Deliverable
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Deliverable</DialogTitle>
          <DialogDescription>
            Add a new deliverable for a client organization.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Monthly Performance Report"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of this deliverable..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organization_id">Organization *</Label>
              <Select name="organization_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Category *</Label>
              <Select name="category_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {categories.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No categories available.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">File URL</Label>
            <Input
              id="file_url"
              name="file_url"
              type="url"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external_url">External URL</Label>
            <Input
              id="external_url"
              name="external_url"
              type="url"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="draft">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                organizations.length === 0 ||
                categories.length === 0
              }
            >
              {isSubmitting ? "Creating..." : "Create Deliverable"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
