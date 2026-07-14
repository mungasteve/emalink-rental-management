"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Market Insights" },
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
    <header className="sticky top-0 z-[100] w-full bg-white border-b border-border">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Emalink" width={100} height={100} className="h-10 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 ml-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-navy-700 hover:text-navy-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href={portalHref} className="text-[13px] font-medium text-navy-700 hover:text-navy-900 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {session.user?.name?.split(" ")[0]}
              </Link>
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut className="h-3 w-3 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <LogIn className="h-3 w-3 mr-1" /> Sign In
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="gold" size="sm" className="text-xs h-8">
                  List Property
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-md hover:bg-cream-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-cream-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href={portalHref}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-navy-800 hover:bg-cream-50 rounded-md transition-colors"
              >
                My Portal
              </Link>
            )}
          </nav>
          <div className="border-t border-border mt-3 pt-3 flex gap-2">
            {session ? (
              <Button variant="outline" size="sm" className="text-xs flex-1" onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}>
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                  <Button variant="outline" size="sm" className="text-xs w-full">Sign In</Button>
                </Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="flex-1">
                  <Button variant="gold" size="sm" className="text-xs w-full">List Property</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
