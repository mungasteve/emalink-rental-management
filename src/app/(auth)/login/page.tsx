"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Building2, ShieldCheck, DollarSign, Wrench } from "lucide-react";

const features = [
  { icon: Building2, text: "Manage your entire portfolio in one place" },
  { icon: DollarSign, text: "M-Pesa rent collection & owner payouts" },
  { icon: Wrench, text: "Maintenance tracking from report to completion" },
  { icon: ShieldCheck, text: "Legally compliant leases and documentation" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-navy-800 px-12 py-14 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-gold-500/[0.05] blur-[80px]" />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-gold-500/[0.04] blur-[60px]" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <Image src="/logo.png" alt="Emalink" width={150} height={150} className="h-24 w-auto" />
        </Link>

        {/* Main copy */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
          style={{ perspective: "800px", transformOrigin: "top center" }}
        >
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-white leading-tight mb-4">
            Your property,<br />managed like it&apos;s ours.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm">
            Sign in to access your owner or tenant portal and stay on top of everything.
          </p>
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-gold-400" />
                </div>
                <p className="text-sm text-white/60">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <p className="text-white/25 text-xs relative z-10">
          Nairobi, Kenya · EARB Licensed
        </p>
      </div>

      {/* Right — form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-cream-50">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <Image src="/logo.png" alt="Emalink" width={80} height={80} className="h-14 w-auto" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm mx-auto lg:mx-0"
        >
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-navy-800 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in to your Emalink account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-medium text-navy-800 mb-1.5 block">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-navy-800">
                  Password
                </label>
                <Link href="/contact" className="text-xs text-muted-foreground hover:text-navy-800 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-navy-800 hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
