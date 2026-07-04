import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-4">Error 404</p>
        <h1 className="font-[var(--font-heading)] text-5xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-white/60 text-base mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="gold" size="lg" className="px-8">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
