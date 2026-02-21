"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileSpreadsheet, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  date: string;
  status: string;
}

interface ExcelImportProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (leads: Lead[]) => void;
}

export function ExcelImport({ isOpen, onClose, onImport }: ExcelImportProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<Lead[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map Excel columns to Lead structure
        const leads: Lead[] = jsonData.map((row: any, index: number) => ({
          id: `imported-${Date.now()}-${index}`,
          name: row["Name"] || row["name"] || row["Full Name"] || "Unknown",
          email: row["Email"] || row["email"] || row["Email Address"] || "",
          phone: row["Phone"] || row["phone"] || row["Phone Number"] || "",
          source: row["Source"] || row["source"] || "Import",
          campaign: row["Campaign"] || row["campaign"] || "Imported",
          date: row["Date"] || row["date"] || new Date().toISOString().split("T")[0],
          status: row["Status"] || row["status"] || "new",
        }));

        setPreviewData(leads.slice(0, 10)); // Show first 10 for preview
        setFile(file);
        setIsProcessing(false);
      } catch (err) {
        setError("Failed to parse Excel file. Please check the format.");
        setIsProcessing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls"))) {
        processFile(droppedFile);
      } else {
        setError("Please upload an Excel file (.xlsx or .xls)");
      }
    },
    [processFile]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleImport = () => {
    if (previewData.length > 0) {
      onImport(previewData);
      onClose();
      setFile(null);
      setPreviewData([]);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewData([]);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-xl border border-border bg-background p-6 shadow-lg mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="text-lg font-semibold mb-2">Import Leads from Excel</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Upload an Excel file with lead data. Columns should include: Name, Email, Phone, Source, Campaign, Date, Status
        </p>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Processing file...</p>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium mb-1">
                  Drag and drop your Excel file here
                </p>
                <p className="text-xs text-muted-foreground mb-4">or</p>
                <label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button variant="outline" asChild>
                    <span className="cursor-pointer">Browse Files</span>
                  </Button>
                </label>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <FileSpreadsheet className="h-8 w-8 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {previewData.length} leads found
                </p>
              </div>
              <button onClick={reset} className="p-1 rounded hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Preview (first 10 rows)</p>
              <div className="rounded-lg border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium">Name</th>
                      <th className="px-3 py-2 text-left font-medium">Email</th>
                      <th className="px-3 py-2 text-left font-medium">Source</th>
                      <th className="px-3 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((lead, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-3 py-2">{lead.name}</td>
                        <td className="px-3 py-2 text-muted-foreground">{lead.email}</td>
                        <td className="px-3 py-2 text-muted-foreground">{lead.source}</td>
                        <td className="px-3 py-2 text-muted-foreground capitalize">{lead.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={previewData.length === 0}
            className="flex-1"
          >
            <Check className="h-4 w-4 mr-2" />
            Import {previewData.length} Leads
          </Button>
        </div>
      </div>
    </div>
  );
}
