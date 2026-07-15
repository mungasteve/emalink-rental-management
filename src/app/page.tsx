import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";

const cards = [
  {
    title: "Our Services",
    description: "Rent collection, tenant screening, maintenance & legal compliance.",
    href: "/services",
    image: "/images/maria-ziegler-jJnZg7vBfMs-unsplash.jpg",
  },
  {
    title: "Browse Properties",
    description: "Managed rental properties across Nairobi's best neighborhoods.",
    href: "/properties",
    image: "/images/clay-banks-urH155LONWs-unsplash.jpg",
  },
  {
    title: "About Emalink",
    description: "Founded by S.M. Maranga to bring transparency to property management.",
    href: "/about",
    image: "/images/brian-marete-V3YD8ACd0s0-unsplash.jpg",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/brian-marete-V3YD8ACd0s0-unsplash.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/60" />
        <div className="relative z-10 text-center px-4 py-20">
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Your property, professionally managed.
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-4">
            Rent collected. Tenants screened. Maintenance handled. One monthly statement.
          </p>
          <p className="text-white/60 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
            Trusted by landlords across Kenya.
          </p>
        </div>
      </section>

      {/* 3 Photo Cards */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card) => (
              <Link key={card.title} href={card.href} className="group">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 uppercase tracking-wide text-center mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-navy-600 text-center mb-4">
                  {card.description}
                </p>
                <div className="text-center">
                  <span className="inline-block border border-navy-800 text-navy-800 text-xs uppercase tracking-[0.15em] px-6 py-2.5 group-hover:bg-navy-800 group-hover:text-white transition-colors">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — Founder / About */}
      <section className="py-16 sm:py-24 bg-cream-50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div>
              <p className="text-[11px] font-medium text-gold-500 uppercase tracking-[0.2em] mb-3">
                Why Emalink
              </p>
              <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-navy-800 leading-tight mb-6">
                Your Property,<br />Our Priority.
              </h2>
              <p className="text-navy-600 text-[15px] leading-[1.85] mb-8">
                Emalink was founded to solve a simple problem: landlords in Nairobi deserve a property manager who is transparent, accountable, and easy to reach. We collect rent on time, screen tenants properly, and handle maintenance without the runaround.
              </p>
              <LinkButton href="/about" variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                Read Our Story
              </LinkButton>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/clay-banks-urH155LONWs-unsplash.jpg"
                alt="Nairobi property"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-4">
            List your property with Emalink
          </h2>
          <p className="text-navy-600 text-sm max-w-lg mx-auto mb-8">
            We are onboarding our first landlords now. Tell us about your property and we&apos;ll send a proposal within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              Get in Touch
            </LinkButton>
            <LinkButton href="/pricing" variant="outline" size="lg" className="px-8">
              View Pricing
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
