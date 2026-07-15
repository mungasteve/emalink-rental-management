import Link from "next/link";
import Image from "next/image";

const services = [
  { href: "/services", label: "Tenant Screening" },
  { href: "/services", label: "Rent Collection" },
  { href: "/services", label: "Maintenance" },
  { href: "/services", label: "Legal & Compliance" },
  { href: "/services", label: "Vacancy Marketing" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/properties", label: "Properties" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <Image src="/icon-nav.png" alt="" width={36} height={38} className="h-9 w-auto" />
              <div className="leading-none">
                <span className="block text-white text-[13px] font-bold tracking-[0.2em]">EMALINK</span>
                <span className="block text-white/50 text-[7px] tracking-[0.18em] mt-0.5">PROPERTY MANAGEMENT</span>
              </div>
            </Link>
            <p className="text-xs text-white/50 leading-relaxed mb-2">
              Property management for landlords in Nairobi.
            </p>
            <a href="mailto:info@emalink.co.ke" className="text-xs text-white/50 hover:text-white transition-colors">
              info@emalink.co.ke
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-medium text-white/80 uppercase tracking-[0.2em] mb-4">Services</p>
            <ul className="space-y-1.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-xs text-white/50 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-medium text-white/80 uppercase tracking-[0.2em] mb-4">Company</p>
            <ul className="space-y-1.5">
              {company.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="text-xs text-white/50 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <p className="text-[11px] font-medium text-white/80 uppercase tracking-[0.2em] mb-4">Portals</p>
            <ul className="space-y-1.5">
              <li><Link href="/owner" className="text-xs text-white/50 hover:text-white transition-colors">Owner Portal</Link></li>
              <li><Link href="/tenant" className="text-xs text-white/50 hover:text-white transition-colors">Tenant Portal</Link></li>
              <li><Link href="/login" className="text-xs text-white/50 hover:text-white transition-colors">Sign In</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-white/40">
            © {new Date().getFullYear()} Emalink Property Management · Nairobi, Kenya
          </p>
          <div className="flex gap-4">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-[11px] text-white/40 hover:text-white/70 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
