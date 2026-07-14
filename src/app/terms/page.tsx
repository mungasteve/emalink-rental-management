import { LinkButton } from "@/components/ui/link-button";

export default function TermsPage() {
  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/70 text-sm">Last updated: July 2025</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="font-semibold text-navy-800 text-lg mb-3">Management Fee</h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              10% of gross receipts collected through Emalink. If we collect nothing in a given month, you pay nothing. The fee covers tenant screening, rent collection, maintenance coordination, monthly statements, and legal compliance support.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 text-lg mb-3">Contract Term</h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              Initial term of 3 to 5 years as agreed between Emalink and the property owner. Automatic renewal unless either party provides 30 days written notice before expiration.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 text-lg mb-3">Cancellation</h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              30 days written notice to terminate. No penalties. All outstanding rent collected and expenses are settled within 7 days of termination. We hand over all records cleanly.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 text-lg mb-3">Maintenance Approval</h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              Any single repair above KES 10,000 requires owner approval before proceeding. Repairs below this threshold may be approved by our maintenance team for faster resolution. Critical emergencies (water leaks, electrical hazards) are handled immediately with owner notification.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy-800 text-lg mb-3">Liability</h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              Emalink acts as a managing agent. We do not guarantee tenant behaviour, rental income, or property appreciation. Our obligation is to manage your property professionally, collect rent diligently, and keep you informed.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-navy-600 text-sm leading-relaxed mb-6">
              Questions about these terms? We are happy to discuss specifics.
            </p>
            <LinkButton href="/contact" variant="gold" size="sm">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
