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
      {/* Search header */}
      <section className="bg-navy-800 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-2">
            Find a property in Nairobi
          </h1>
          <p className="text-white/50 text-sm mb-6">
            Rental properties managed by Emalink across Nairobi&apos;s top neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <Link href="/properties" className="flex-1">
              <div className="bg-white rounded-md px-4 py-2.5 text-sm text-muted-foreground cursor-pointer hover:ring-2 hover:ring-gold-500 transition-all">
                Search by location, type, or budget...
              </div>
            </Link>
            <LinkButton href="/properties" variant="gold" size="sm" className="shrink-0 px-6">
              Browse All
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-10 sm:py-14 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-navy-800">Neighborhoods we serve</h2>
            <Link href="/properties" className="text-xs text-navy-600 hover:text-navy-800 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {neighborhoods.map((n) => (
              <Link
                key={n.name}
                href={`/properties?location=${n.name}`}
                className="border border-border rounded-md px-3 py-2.5 hover:border-navy-800/30 hover:bg-cream-50 transition-all group"
              >
                <p className="text-sm font-medium text-navy-800 group-hover:text-navy-900">{n.name}</p>
                <p className="text-[11px] text-muted-foreground">{n.type}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services summary */}
      <section className="py-10 sm:py-14 bg-cream-50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">
            <div>
              <h2 className="text-base font-semibold text-navy-800 mb-4">What we handle</h2>
              <div className="text-navy-600 text-sm leading-[1.8] space-y-4">
                <p>
                  <strong className="text-navy-800">Tenant screening</strong> — background checks, employment verification, and reference calls before anyone gets keys.
                </p>
                <p>
                  <strong className="text-navy-800">Rent collection</strong> — M-Pesa and bank transfer with automatic reminders. You get a monthly statement, not a phone call.
                </p>
                <p>
                  <strong className="text-navy-800">Maintenance</strong> — logged, tracked, fixed. You approve anything above KES 10,000.
                </p>
                <p>
                  <strong className="text-navy-800">Legal &amp; compliance</strong> — leases under Kenya&apos;s Landlord and Tenant Act. Notices and evictions handled correctly.
                </p>
              </div>
              <div className="mt-6">
                <LinkButton href="/services" variant="outline" size="sm" className="text-xs">
                  Full service details →
                </LinkButton>
              </div>
            </div>
            <div className="bg-white border border-border rounded-lg p-5">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Management fee</p>
              <p className="text-3xl font-bold text-navy-800">10%</p>
              <p className="text-xs text-muted-foreground mb-4">of gross receipts collected</p>
              <ul className="text-xs text-navy-600 space-y-1.5">
                <li>✓ All services included</li>
                <li>✓ No setup fee</li>
                <li>✓ No charge for vacant units</li>
                <li>✓ Cancel with 30 days notice</li>
              </ul>
              <div className="mt-5">
                <LinkButton href="/contact" variant="gold" size="sm" className="text-xs w-full justify-center">
                  Get a proposal
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market insights */}
      <section className="py-10 sm:py-14 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-navy-800">Market insights</h2>
            <Link href="/blog" className="text-xs text-navy-600 hover:text-navy-800 transition-colors">
              All articles →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="border border-border rounded-md p-4 hover:border-navy-800/30 hover:bg-cream-50 transition-all group"
              >
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  {post.category}
                </span>
                <p className="text-sm font-medium text-navy-800 mt-1.5 leading-snug group-hover:text-navy-900">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-3">
              List your property with Emalink
            </h2>
            <p className="text-sm text-navy-600 leading-relaxed mb-5">
              We are onboarding our first landlords now. Direct access to the founder, no middlemen. Tell us about your property and we&apos;ll send a management proposal within 48 hours.
            </p>
            <div className="flex gap-3">
              <LinkButton href="/contact" variant="gold" size="sm">
                Get in touch
              </LinkButton>
              <LinkButton href="/pricing" variant="outline" size="sm">
                View pricing
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
