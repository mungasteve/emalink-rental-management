import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  properties: [
    { href: "/properties?type=residential", label: "Residential" },
    { href: "/properties?type=commercial", label: "Commercial" },
    { href: "/properties?type=industrial", label: "Industrial" },
    { href: "/properties", label: "All Properties" },
  ],
  portals: [
    { href: "/tenant", label: "Tenant Portal" },
    { href: "/owner", label: "Owner Portal" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="Emalink" width={120} height={120} className="h-16 w-auto" />
            </div>
            <p className="text-sm text-white/55 mb-4 leading-relaxed">
              Professional property management services. We grow together with
              property owners and tenants across the region.
            </p>
            <p className="text-gold-400 font-semibold text-sm italic">We Grow Together</p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Properties</h3>
            <ul className="space-y-2.5">
              {footerLinks.properties.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-white/55">
                <Phone className="h-4 w-4 text-white/40 shrink-0" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/55">
                <Mail className="h-4 w-4 text-white/40 shrink-0" />
                info@emalink.co.ke
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Emalink Property Management. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
