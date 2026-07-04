"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        phone: form.get("phone"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 3000);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-navy-800 px-12 py-14 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-gold-500/[0.05] blur-[80px]" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-gold-500/[0.04] blur-[60px]" />

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <Image src="/logo.png" alt="Emalink" width={150} height={150} className="h-24 w-auto" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-white leading-tight mb-4">
            Join Emalink<br />before we launch.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            Create an account and get early access to the platform. We&apos;ll
            review your request and activate your portal within 24 hours.
          </p>
        </motion.div>

        <p className="text-white/25 text-xs relative z-10">
          Nairobi, Kenya · EARB Licensed
        </p>
      </div>

      {/* Right — form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-cream-50">
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <Image src="/logo.png" alt="Emalink" width={80} height={80} className="h-14 w-auto" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm mx-auto lg:mx-0"
        >
          {done ? (
            <div className="text-center py-8">
              <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <span className="text-emerald-600 text-2xl">✓</span>
              </div>
              <h2 className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mb-2">
                Account created
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                We&apos;ll review your account and grant portal access shortly.
                Redirecting you to sign in…
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-[var(--font-heading)] text-2xl font-bold text-navy-800 mb-1">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Request access to the Emalink platform
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-navy-800 mb-1.5 block">
                    Full Name
                  </label>
                  <Input id="name" name="name" placeholder="Jane Mwangi" required autoComplete="name" className="bg-white" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-navy-800 mb-1.5 block">
                    Email address
                  </label>
                  <Input id="email" name="email" type="email" placeholder="jane@example.com" required autoComplete="email" className="bg-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-navy-800 mb-1.5 block">
                    Phone <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="+254 7XX XXX XXX" autoComplete="tel" className="bg-white" />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-navy-800 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 chars, 1 uppercase, 1 number"
                      required
                      autoComplete="new-password"
                      className="bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy-800 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" variant="gold" className="w-full h-11 text-sm font-semibold" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-navy-800 hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
