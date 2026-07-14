import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";

const neighborhoods = [
  { name: "Westlands", type: "Mixed" },
  { name: "Kilimani", type: "Residential" },
  { name: "Karen", type: "Residential" },
  { name: "Lavington", type: "Residential" },
  { name: "South B", type: "Residential" },
  { name: "South C", type: "Residential" },
  { name: "Langata", type: "Residential" },
  { name: "Kileleshwa", type: "Residential" },
  { name: "Upperhill", type: "Commercial" },
  { name: "Parklands", type: "Mixed" },
];

const posts = [
  {
    id: 1,
    title: "What to check before signing a lease in Nairobi",
    category: "Tenant Guides",
  },
  {
    id: 4,
    title: "Tenant rights under Kenya's Landlord and Tenant Act",
    category: "Legal",
  },
  {
    id: 5,
    title: "Westlands vs Kilimani vs Lavington: where to invest in 2026",
    category: "Market Insights",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — full bleed photo like HassConsult */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/brian-marete-V3YD8ACd0s0-unsplash.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Property Management<br />
            <span className="text-gold-400">Done Right.</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Rent collection, tenant screening, maintenance coordination, and legal compliance — handled by a team that manages your property like it&apos;s theirs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              List Your Property
            </LinkButton>
            <LinkButton href="/properties" variant="outline-light" size="lg" className="px-8">
              Browse Properties
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-medium text-navy-500 uppercase tracking-[0.2em] mb-3">
            Neighborhoods
          </p>
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-8">
            Where we operate
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {neighborhoods.map((n) => (
              <Link
                key={n.name}
                href={`/properties?location=${n.name}`}
                className="border border-border rounded px-4 py-3 hover:border-navy-800/40 hover:bg-cream-50 transition-all group"
              >
                <p className="text-sm font-medium text-navy-800 group-hover:text-navy-900">{n.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{n.type}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 sm:py-20 bg-cream-50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div>
              <p className="text-[11px] font-medium text-navy-500 uppercase tracking-[0.2em] mb-3">
                What We Handle
              </p>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-8">
                Complete property management.
              </h2>
              <div className="text-navy-600 text-[15px] leading-[1.85] space-y-5">
                <p>
                  <strong className="text-navy-800">Tenant screening.</strong> Background checks, employment verification, and reference calls before anyone gets keys. This happens before a lease is signed.
                </p>
                <p>
                  <strong className="text-navy-800">Rent collection.</strong> M-Pesa and bank transfer with automatic reminders. Monthly statements showing every shilling collected and spent.
                </p>
                <p>
                  <strong className="text-navy-800">Maintenance.</strong> Logged, tracked, fixed. Vetted contractor network across Nairobi. You approve anything above KES 10,000.
                </p>
                <p>
                  <strong className="text-navy-800">Legal &amp; compliance.</strong> Leases under Kenya&apos;s Landlord and Tenant Act. Notices and evictions handled through the correct legal process.
                </p>
              </div>
              <div className="mt-8">
                <LinkButton href="/services" variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                  Full service details →
                </LinkButton>
              </div>
            </div>

            {/* Pricing card */}
            <div className="bg-white border border-border rounded-lg p-6 lg:sticky lg:top-24">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">Management Fee</p>
              <p className="text-4xl font-bold text-navy-800 mb-1">10%</p>
              <p className="text-sm text-muted-foreground mb-6">of gross receipts collected</p>
              <ul className="text-sm text-navy-600 space-y-2 mb-6">
                <li>✓ All services included</li>
                <li>✓ No setup fee</li>
                <li>✓ No charge for vacant units</li>
                <li>✓ Cancel with 30 days notice</li>
              </ul>
              <LinkButton href="/contact" variant="gold" size="sm" className="w-full justify-center text-xs uppercase tracking-wider">
                Get a Proposal
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-medium text-navy-500 uppercase tracking-[0.2em] mb-3">
                Insights
              </p>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800">
                Nairobi property market
              </h2>
            </div>
            <Link href="/blog" className="text-xs text-navy-600 hover:text-navy-800 uppercase tracking-wider transition-colors hidden sm:block">
              All articles →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group"
              >
                <div className="border border-border rounded-lg p-5 h-full hover:border-navy-800/30 transition-all">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mb-3">
                    {post.category}
                  </p>
                  <p className="text-base font-medium text-navy-800 leading-snug group-hover:text-navy-600 transition-colors">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link href="/blog" className="text-xs text-navy-600 hover:text-navy-800 uppercase tracking-wider transition-colors">
              All articles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-4">
            List your property with Emalink
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            We are onboarding our first landlords now. Direct access to the founder. Tell us about your property and we&apos;ll send a proposal within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              Get in Touch
            </LinkButton>
            <LinkButton href="/pricing" variant="outline-light" size="lg" className="px-8">
              View Pricing
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
