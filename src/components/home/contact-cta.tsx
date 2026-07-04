import { LinkButton } from "@/components/ui/link-button";

export function ContactCTA() {
  return (
    <section className="py-14 sm:py-20 bg-gold-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-3">
              Got a property sitting idle?
            </h2>
            <p className="text-navy-800/60 text-sm max-w-sm leading-relaxed">
              Tell us about it. We&apos;ll assess it, price it, and have it
              listed within days — not weeks.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <LinkButton
              href="/contact"
              size="lg"
              variant="default"
              className="px-7 w-full sm:w-auto justify-center"
            >
              Talk to Us
            </LinkButton>
            <LinkButton
              href="/properties"
              size="lg"
              variant="outline"
              className="border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white px-7 w-full sm:w-auto justify-center"
            >
              Browse Properties
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
