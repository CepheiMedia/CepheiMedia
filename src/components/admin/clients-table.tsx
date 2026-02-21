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
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { deleteClient, updateClientStatus } from "@/app/(admin)/admin/actions";
import { EditClientDialog } from "./edit-client-dialog";

interface Organization {
  id: string;
  name: string;
}

interface Client {
  id: string;
  email: string;
  full_name: string | null;
  status?: "active" | "inactive" | "pending";
  created_at: string;
  organization: Organization | null;
}

interface ClientsTableProps {
  clients: Client[];
  organizations: Organization[];
}

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    icon: UserCheck,
  },
  inactive: {
    label: "Inactive",
    variant: "secondary" as const,
    icon: UserX,
  },
  pending: {
    label: "Pending",
    variant: "outline" as const,
    icon: Clock,
  },
};

export function ClientsTable({ clients, organizations }: ClientsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteClient(deleteId);
    setIsDeleting(false);
    if (!result.success) {
      alert(result.error);
    }
    setDeleteId(null);
  };

  const handleStatusChange = async (
    id: string,
    status: "active" | "inactive" | "pending"
  ) => {
    const result = await updateClientStatus(id, status);
    if (!result.success) {
      alert(result.error);
    }
  };

  if (clients.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/50 p-12 text-center">
        <p className="text-muted-foreground">No clients yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first client to get started.
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
              <TableHead>Email</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => {
              const status = client.status || "active";
              const config = statusConfig[status];

              return (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.full_name || "—"}
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    {client.organization?.name || (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(client.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditClient(client)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {status !== "active" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(client.id, "active")}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Set Active
                          </DropdownMenuItem>
                        )}
                        {status !== "inactive" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(client.id, "inactive")}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Set Inactive
                          </DropdownMenuItem>
                        )}
                        {status !== "pending" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(client.id, "pending")}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Set Pending
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(client.id)}
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
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client? This will remove their
              account and all associated data. This action cannot be undone.
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

      {editClient && (
        <EditClientDialog
          client={editClient}
          organizations={organizations}
          open={!!editClient}
          onOpenChange={() => setEditClient(null)}
        />
      )}
    </>
  );
}
