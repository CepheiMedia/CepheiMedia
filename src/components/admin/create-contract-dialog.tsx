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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { createContract } from "@/app/(admin)/admin/actions";

interface Organization {
  id: string;
  name: string;
}

interface Package {
  id: string;
  name: string;
  base_price: number;
}

interface CreateContractDialogProps {
  organizations: Organization[];
  packages: Package[];
}

export function CreateContractDialog({
  organizations,
  packages,
}: CreateContractDialogProps) {
  const [open, setOpen] = useState(false);
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

    const result = await createContract(formData);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to create contract");
      return;
    }

    setOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Contract
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Contract</DialogTitle>
          <DialogDescription>
            Create a new service contract for a client organization.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
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
            <Label htmlFor="package_id">Package *</Label>
            <Select name="package_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                {packages.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.name} - {formatCurrency(pkg.base_price)}/mo
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {packages.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No packages available. Create packages first.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                defaultValue={today}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input id="end_date" name="end_date" type="date" />
              <p className="text-xs text-muted-foreground">
                Leave empty for ongoing contracts
              </p>
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
                defaultValue="0"
                className="pl-7"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="active">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
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
                packages.length === 0
              }
            >
              {isSubmitting ? "Creating..." : "Create Contract"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
