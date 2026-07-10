import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, Phone, ChevronDown, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm">
          <Image src="/logo.png" alt="Emalink" width={120} height={120} className="h-16 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-800/75 hover:text-navy-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {session && (
            <div
              className="relative"
              onMouseEnter={() => setPortalOpen(true)}
              onMouseLeave={() => setPortalOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-navy-800/75 hover:text-navy-800 transition-colors"
                aria-expanded={portalOpen}
                aria-haspopup="true"
              >
                Portals <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {portalOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-border rounded-lg elevation-card-hover py-1 z-50">
                  {portalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-navy-800/75 hover:bg-cream-100 hover:text-navy-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">

          {session ? (
            <div className="flex items-center gap-2">
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
                <Button variant="gold">
                  List Property
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-cream-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-3 mt-8 p-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-navy-800 hover:text-navy-600 transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}

              {session && (
                <div className="border-t border-border pt-3 mt-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Portals</p>
                  {portalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-base font-medium text-navy-800 hover:text-navy-600 transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="border-t border-border pt-3 mt-2">
                {session ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <LogIn className="h-4 w-4 mr-2" /> Sign In
                      </Button>
                    </Link>
                    <Link href="/contact?type=owner" onClick={() => setOpen(false)}>
                      <Button variant="gold" className="w-full">
                        List Property
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
