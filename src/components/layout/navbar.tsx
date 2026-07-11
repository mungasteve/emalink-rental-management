import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, ChevronDown, LogIn, LogOut, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const portalLinks = [
  { href: "/tenant", label: "Tenant Portal" },
  { href: "/owner", label: "Owner Portal" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-[100] w-full bg-white border-b border-border shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm flex-shrink-0">
          <Image src="/logo.png" alt="Emalink" width={140} height={140} className="h-20 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 ml-12" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-800/70 hover:text-navy-800 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {session && (
            <Link href="/wishlist" className="text-sm font-medium text-navy-800/70 hover:text-navy-800 transition-colors duration-200 flex items-center gap-1">
              <Heart className="h-4 w-4" /> Wishlist
            </Link>
          )}

          {session && (
            <div
              className="relative"
              onMouseEnter={() => setPortalOpen(true)}
              onMouseLeave={() => setPortalOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-navy-800/70 hover:text-navy-800 transition-colors duration-200"
                aria-expanded={portalOpen}
                aria-haspopup="true"
              >
                Portals <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {portalOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-border rounded-lg elevation-card-hover py-1 z-50">
                  {portalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-navy-800/70 hover:bg-cream-100 hover:text-navy-800 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-navy-800">
                <User className="h-4 w-4" />
                {session.user?.name?.split(" ")[0]}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-3.5 w-3.5 mr-1" /> Sign In
                </Button>
              </Link>
              <Link href="/contact?type=owner">
                <Button variant="gold" size="lg">
                  List Property
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-cream-100 transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 pt-8">
            {/* Mobile Logo */}
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center mb-8">
              <Image src="/logo.png" alt="Emalink" width={120} height={120} className="h-16 w-auto" />
            </Link>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-navy-800 hover:bg-cream-100 rounded-lg transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}

              {session && (
                <Link href="/wishlist" onClick={() => setOpen(false)} className="px-4 py-3 text-base font-medium text-navy-800 hover:bg-cream-100 rounded-lg transition-colors duration-150 flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Wishlist
                </Link>
              )}

              {session && (
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-xs text-navy-600 uppercase tracking-wider px-4 mb-2">Portals</p>
                  {portalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-navy-800 hover:bg-cream-100 rounded-lg transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="border-t border-border pt-4 mt-4 space-y-2">
                {session ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)} className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" /> Sign In
                      </Button>
                    </Link>
                    <Link href="/contact?type=owner" onClick={() => setOpen(false)} className="block">
                      <Button variant="gold" size="lg" className="w-full justify-start">
                        List Property
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
