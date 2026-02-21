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
  FileCheck,
  Eye,
  Archive,
  ExternalLink,
} from "lucide-react";
import {
  deleteDeliverable,
  updateDeliverableStatus,
} from "@/app/(admin)/admin/actions";
import { EditDeliverableDialog } from "./edit-deliverable-dialog";

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
  delivered_at: string | null;
  created_at: string;
  organization: Organization;
  category: Category;
}

interface DeliverablesTableProps {
  deliverables: Deliverable[];
  organizations: Organization[];
  categories: Category[];
}

const statusConfig = {
  draft: {
    label: "Draft",
    variant: "outline" as const,
  },
  in_review: {
    label: "In Review",
    variant: "secondary" as const,
  },
  delivered: {
    label: "Delivered",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  archived: {
    label: "Archived",
    variant: "outline" as const,
    className: "border-muted-foreground text-muted-foreground",
  },
};

export function DeliverablesTable({
  deliverables,
  organizations,
  categories,
}: DeliverablesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editDeliverable, setEditDeliverable] = useState<Deliverable | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteDeliverable(deleteId);
    setIsDeleting(false);
    if (!result.success) {
      alert(result.error);
    }
    setDeleteId(null);
  };

  const handleStatusChange = async (
    id: string,
    status: "draft" | "in_review" | "delivered" | "archived"
  ) => {
    const result = await updateDeliverableStatus(id, status);
    if (!result.success) {
      alert(result.error);
    }
  };

  if (deliverables.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/50 p-12 text-center">
        <p className="text-muted-foreground">No deliverables yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first deliverable to get started.
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
              <TableHead>Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverables.map((deliverable) => {
              const config = statusConfig[deliverable.status];

              return (
                <TableRow key={deliverable.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{deliverable.title}</p>
                      {deliverable.description && (
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {deliverable.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {deliverable.organization?.name || "Unknown"}
                  </TableCell>
                  <TableCell>
                    {deliverable.category?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={config.variant}
                      className={
                        "className" in config ? config.className : undefined
                      }
                    >
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {deliverable.file_url && (
                        <a
                          href={deliverable.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {deliverable.external_url && (
                        <a
                          href={deliverable.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {!deliverable.file_url && !deliverable.external_url && (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(deliverable.created_at).toLocaleDateString()}
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
                          onClick={() => setEditDeliverable(deliverable)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {deliverable.status !== "in_review" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(deliverable.id, "in_review")
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Set In Review
                          </DropdownMenuItem>
                        )}
                        {deliverable.status !== "delivered" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(deliverable.id, "delivered")
                            }
                          >
                            <FileCheck className="mr-2 h-4 w-4" />
                            Mark Delivered
                          </DropdownMenuItem>
                        )}
                        {deliverable.status !== "archived" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(deliverable.id, "archived")
                            }
                          >
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(deliverable.id)}
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
            <AlertDialogTitle>Delete Deliverable</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this deliverable? This action
              cannot be undone.
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

      {editDeliverable && (
        <EditDeliverableDialog
          deliverable={editDeliverable}
          organizations={organizations}
          categories={categories}
          open={!!editDeliverable}
          onOpenChange={() => setEditDeliverable(null)}
        />
      )}
    </>
  );
}
