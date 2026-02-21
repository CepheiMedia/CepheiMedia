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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateInquiryNotes } from "@/app/(admin)/admin/actions";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  services_requested: string[] | null;
  budget_range: string | null;
  project_details: string | null;
  status: "new" | "contacted" | "converted" | "declined";
  contacted_at: string | null;
  notes: string | null;
  created_at: string;
}

interface InquiryDetailDialogProps {
  inquiry: Inquiry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const serviceLabels: Record<string, string> = {
  dtm: "Digital Traffic Management",
  ddm: "Digital Data Maximization",
  strategy: "Strategy Consultation",
};

const budgetLabels: Record<string, string> = {
  starter: "$500-$1,500/mo",
  growth: "$1,500-$5,000/mo",
  scale: "$5,000+/mo",
};

const statusConfig = {
  new: { label: "New", variant: "default" as const },
  contacted: { label: "Contacted", variant: "secondary" as const },
  converted: {
    label: "Converted",
    variant: "outline" as const,
    className: "border-green-500 text-green-500",
  },
  declined: {
    label: "Declined",
    variant: "outline" as const,
    className: "border-muted-foreground text-muted-foreground",
  },
};

export function InquiryDetailDialog({
  inquiry,
  open,
  onOpenChange,
}: InquiryDetailDialogProps) {
  const [notes, setNotes] = useState(inquiry.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    await updateInquiryNotes(inquiry.id, notes);
    setIsSaving(false);
  };

  const status = inquiry.status || "new";
  const config = statusConfig[status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{inquiry.name}</DialogTitle>
            <Badge
              variant={config.variant}
              className={"className" in config ? config.className : undefined}
            >
              {config.label}
            </Badge>
          </div>
          <DialogDescription>
            Submitted on {new Date(inquiry.created_at).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contact Info */}
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{inquiry.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="font-medium">{inquiry.phone || "Not provided"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Company:</span>
                <p className="font-medium">
                  {inquiry.company || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <p className="font-medium">
                  {inquiry.budget_range
                    ? budgetLabels[inquiry.budget_range] || inquiry.budget_range
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <span className="text-sm text-muted-foreground">
              Services Requested:
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {inquiry.services_requested?.length ? (
                inquiry.services_requested.map((service) => (
                  <Badge key={service} variant="secondary">
                    {serviceLabels[service] || service}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  None specified
                </span>
              )}
            </div>
          </div>

          {/* Project Details */}
          {inquiry.project_details && (
            <div>
              <span className="text-sm text-muted-foreground">
                Project Details:
              </span>
              <p className="mt-1 whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm">
                {inquiry.project_details}
              </p>
            </div>
          )}

          <Separator />

          {/* Contact History */}
          {inquiry.contacted_at && (
            <div>
              <span className="text-sm text-muted-foreground">
                Contacted at:
              </span>
              <p className="text-sm">
                {new Date(inquiry.contacted_at).toLocaleString()}
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Admin Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this inquiry..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Close
          </Button>
          <Button onClick={handleSaveNotes} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Notes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
