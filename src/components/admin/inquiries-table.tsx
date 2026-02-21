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
  Eye,
  Phone,
  UserPlus,
  XCircle,
  Trash2,
} from "lucide-react";
import {
  updateInquiryStatus,
  deleteInquiry,
} from "@/app/(admin)/admin/actions";
import { InquiryDetailDialog } from "./inquiry-detail-dialog";
import { ConvertInquiryDialog } from "./convert-inquiry-dialog";

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

interface InquiriesTableProps {
  inquiries: Inquiry[];
}

const statusConfig = {
  new: {
    label: "New",
    variant: "default" as const,
  },
  contacted: {
    label: "Contacted",
    variant: "secondary" as const,
  },
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

const budgetLabels: Record<string, string> = {
  starter: "$500-$1,500/mo",
  growth: "$1,500-$5,000/mo",
  scale: "$5,000+/mo",
};

export function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewInquiry, setViewInquiry] = useState<Inquiry | null>(null);
  const [convertInquiry, setConvertInquiry] = useState<Inquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteInquiry(deleteId);
    setIsDeleting(false);
    if (!result.success) {
      alert(result.error);
    }
    setDeleteId(null);
  };

  const handleStatusChange = async (
    id: string,
    status: "contacted" | "declined"
  ) => {
    const result = await updateInquiryStatus(id, status);
    if (!result.success) {
      alert(result.error);
    }
  };

  if (inquiries.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/50 p-12 text-center">
        <p className="text-muted-foreground">No inquiries yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Form submissions will appear here.
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
              <TableHead>Company</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Submitted</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => {
              const status = inquiry.status || "new";
              const config = statusConfig[status];

              return (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>{inquiry.company || "—"}</TableCell>
                  <TableCell>
                    {inquiry.budget_range
                      ? budgetLabels[inquiry.budget_range] || inquiry.budget_range
                      : "—"}
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
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(inquiry.created_at).toLocaleDateString()}
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
                          onClick={() => setViewInquiry(inquiry)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {status === "new" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(inquiry.id, "contacted")
                              }
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Mark Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setConvertInquiry(inquiry)}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Convert to Client
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(inquiry.id, "declined")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Mark Declined
                            </DropdownMenuItem>
                          </>
                        )}
                        {status === "contacted" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setConvertInquiry(inquiry)}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Convert to Client
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(inquiry.id, "declined")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Mark Declined
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(inquiry.id)}
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
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inquiry? This action cannot
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

      {viewInquiry && (
        <InquiryDetailDialog
          inquiry={viewInquiry}
          open={!!viewInquiry}
          onOpenChange={() => setViewInquiry(null)}
        />
      )}

      {convertInquiry && (
        <ConvertInquiryDialog
          inquiry={convertInquiry}
          open={!!convertInquiry}
          onOpenChange={() => setConvertInquiry(null)}
        />
      )}
    </>
  );
}
