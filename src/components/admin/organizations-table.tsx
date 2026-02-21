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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { MoreHorizontal, Pencil, Trash2, ExternalLink } from "lucide-react";
import { deleteOrganization } from "@/app/(admin)/admin/actions";
import { EditOrgDialog } from "./edit-org-dialog";

interface Organization {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  website: string | null;
  created_at: string;
  clientCount: number;
}

interface OrganizationsTableProps {
  organizations: Organization[];
}

export function OrganizationsTable({ organizations }: OrganizationsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editOrg, setEditOrg] = useState<Organization | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteOrganization(deleteId);
    setIsDeleting(false);
    if (!result.success) {
      alert(result.error);
    }
    setDeleteId(null);
  };

  if (organizations.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/50 p-12 text-center">
        <p className="text-muted-foreground">No organizations yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first organization to get started.
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
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="text-center">Clients</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell className="text-muted-foreground">{org.slug}</TableCell>
                <TableCell>{org.industry || "—"}</TableCell>
                <TableCell>
                  {org.website ? (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="text-center">{org.clientCount}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(org.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditOrg(org)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(org.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this organization? This action
              cannot be undone. Organizations with active clients cannot be
              deleted.
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

      {editOrg && (
        <EditOrgDialog
          organization={editOrg}
          open={!!editOrg}
          onOpenChange={() => setEditOrg(null)}
        />
      )}
    </>
  );
}
