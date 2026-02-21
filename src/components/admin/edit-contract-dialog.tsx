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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateContract } from "@/app/(admin)/admin/actions";

interface Organization {
  id: string;
  name: string;
}

interface Package {
  id: string;
  name: string;
  base_price: number;
}

interface Contract {
  id: string;
  organization_id: string;
  package_id: string;
  start_date: string;
  end_date: string | null;
  monthly_ad_spend: number;
  status: "active" | "paused" | "cancelled" | "expired";
  organization: Organization;
  package: Package;
}

interface EditContractDialogProps {
  contract: Contract;
  organizations: Organization[];
  packages: Package[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditContractDialog({
  contract,
  organizations,
  packages,
  open,
  onOpenChange,
}: EditContractDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await updateContract(contract.id, formData);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to update contract");
      return;
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contract</DialogTitle>
          <DialogDescription>
            Update contract details for {contract.organization?.name}.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Organization</Label>
            <Input
              value={contract.organization?.name || "Unknown"}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Organization cannot be changed. Create a new contract instead.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package_id">Package *</Label>
            <Select name="package_id" defaultValue={contract.package_id} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {packages.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.name} - {formatCurrency(pkg.base_price)}/mo
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                defaultValue={contract.start_date}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                defaultValue={contract.end_date || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly_ad_spend">Monthly Ad Spend *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="monthly_ad_spend"
                name="monthly_ad_spend"
                type="number"
                min="0"
                step="100"
                defaultValue={contract.monthly_ad_spend}
                className="pl-7"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={contract.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
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
