"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Play,
  Pause,
  XCircle,
} from "lucide-react";
import { deleteContract, updateContractStatus } from "@/app/(admin)/admin/actions";
import { EditContractDialog } from "./edit-contract-dialog";

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
  created_at: string;
  organization: Organization;
  package: Package;
}

interface ContractsTableProps {
  contracts: Contract[];
  organizations: Organization[];
  packages: Package[];
}

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  paused: {
    label: "Paused",
    variant: "secondary" as const,
  },
  cancelled: {
    label: "Cancelled",
    variant: "outline" as const,
    className: "border-destructive text-destructive",
  },
  expired: {
    label: "Expired",
    variant: "outline" as const,
    className: "border-muted-foreground text-muted-foreground",
  },
};

export function ContractsTable({
  contracts,
  organizations,
  packages,
}: ContractsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editContract, setEditContract] = useState<Contract | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteContract(deleteId);
    setIsDeleting(false);
    if (!result.success) {
      alert(result.error);
    }
    setDeleteId(null);
  };

  const handleStatusChange = async (
    id: string,
    status: "active" | "paused" | "cancelled" | "expired"
  ) => {
    const result = await updateContractStatus(id, status);
    if (!result.success) {
      alert(result.error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (contracts.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/50 p-12 text-center">
        <p className="text-muted-foreground">No contracts yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first contract to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border/60 bg-card/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Ad Spend</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => {
              const config = statusConfig[contract.status];

              return (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">
                    {contract.organization?.name || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{contract.package?.name || "Unknown"}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(contract.package?.base_price || 0)}/mo
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(contract.monthly_ad_spend)}/mo
                  </TableCell>
                  <TableCell>
                    {new Date(contract.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {contract.end_date
                      ? new Date(contract.end_date).toLocaleDateString()
                      : "Ongoing"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={config.variant}
                      className={"className" in config ? config.className : undefined}
                    >
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditContract(contract)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {contract.status !== "active" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(contract.id, "active")
                            }
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Set Active
                          </DropdownMenuItem>
                        )}
                        {contract.status !== "paused" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(contract.id, "paused")
                            }
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </DropdownMenuItem>
                        )}
                        {contract.status !== "cancelled" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(contract.id, "cancelled")
                            }
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(contract.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contract</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contract? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editContract && (
        <EditContractDialog
          contract={editContract}
          organizations={organizations}
          packages={packages}
          open={!!editContract}
          onOpenChange={() => setEditContract(null)}
        />
      )}
    </>
  );
}
