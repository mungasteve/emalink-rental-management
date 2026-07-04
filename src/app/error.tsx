"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4">Error 500</p>
        <h1 className="font-[var(--font-heading)] text-5xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/60 text-base mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="gold" size="lg" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => window.location.href = "/"}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
