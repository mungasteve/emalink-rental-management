"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const portalHref = session?.user?.role === "ADMIN" ? "/admin"
    : session?.user?.role === "OWNER" || session?.user?.role === "MANAGER" ? "/owner"
    : session?.user?.role === "TENANT" ? "/tenant" : "/login";

  return (
    <header className="sticky top-0 z-[100] w-full bg-navy-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo className="h-10 w-auto" light />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 ml-auto mr-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium text-white/70 hover:text-white uppercase tracking-[0.15em] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href={portalHref} className="text-[11px] font-medium text-white/70 hover:text-white uppercase tracking-[0.1em] flex items-center gap-1.5 transition-colors">
                <User className="h-3.5 w-3.5" />
                {session.user?.name?.split(" ")[0]}
              </Link>
              <Button variant="outline" size="sm" className="text-[10px] h-7 border-white/20 text-white hover:bg-white/10 uppercase tracking-wider" onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut className="h-3 w-3 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-[10px] h-7 border-white/20 text-white hover:bg-white/10 uppercase tracking-wider">
                <LogIn className="h-3 w-3 mr-1" /> Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-md text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy-800 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link href={portalHref} onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                My Portal
              </Link>
            )}
          </nav>
          <div className="border-t border-white/10 mt-3 pt-3">
            {session ? (
              <button onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }} className="w-full text-left px-3 py-2.5 text-sm text-white/70 hover:text-white">
                Sign Out
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white/70 hover:text-white">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
