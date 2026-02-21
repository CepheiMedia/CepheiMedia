"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DemoLoginPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = companyName.trim() || "My Company";
    sessionStorage.setItem("demo-company-name", name);
    router.push("/demo");
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex flex-col items-center">
        <Link href="/">
          <Image
            src="/images/cephei-logo.png"
            alt="Cephei Media"
            width={160}
            height={46}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Live Demo
        </h1>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          See what your client portal would look like.
          <br />
          Enter your company name to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-xl border border-border/60 bg-card/50 p-6 space-y-4">
          <div>
            <label htmlFor="company" className="text-sm font-medium">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              autoFocus
              autoComplete="organization"
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Your Company Name"
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            Enter Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to website
        </Link>
      </div>
    </div>
  );
}
