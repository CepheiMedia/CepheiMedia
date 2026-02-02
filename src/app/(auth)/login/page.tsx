import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Client Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your analytics dashboard
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-center text-sm text-muted-foreground">
          Authentication will be configured in Phase 1.
        </p>
      </div>
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
