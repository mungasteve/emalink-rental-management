import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/properties", label: "Properties" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/pricing", label: "Pricing" },
    { href: "/services/terms", label: "Terms & Conditions" },
  ],
  portals: [
    { href: "/tenant", label: "Tenant Portal" },
    { href: "/owner", label: "Owner Portal" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.png" alt="Emalink" width={120} height={120} className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Professional property management services. We grow together with property owners across Kenya.
            </p>
            <p className="text-gold-400 font-semibold text-sm italic">We Grow Together</p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="h-4 w-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@emalink.co.ke" className="hover:text-white transition-colors duration-200">
                  info@emalink.co.ke
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-gold-400 flex-shrink-0" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Emalink Property Management. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/50">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/services/terms" className="hover:text-white transition-colors duration-200">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
