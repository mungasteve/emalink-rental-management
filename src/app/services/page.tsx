import { LinkButton } from "@/components/ui/link-button";

export default function ServicesPage() {
  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
            What We Handle
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight max-w-xl">
            Everything between you and your tenant.
          </h1>
          <p className="text-white/55 text-sm max-w-lg leading-relaxed">
            One fee covers all six services below. You stay in control of decisions — we handle the execution.
          </p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-14 text-navy-600 text-[15px] leading-[1.85]">

            {/* Tenant Screening */}
            <div>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
                Tenant Screening
              </h2>
              <p className="mb-4">
                Before anyone gets a set of keys, every applicant goes through a structured vetting process. We verify employment and income, call previous landlords directly, confirm ID and KRA PIN, and check court records and tenant blacklists.
              </p>
              <p className="mb-4">
                This happens before a lease is signed, not after a problem shows up. We present you with a shortlist of qualified applicants and our recommendation — you make the final call on who moves in.
              </p>
              <p>
                The goal is simple: fewer defaults, fewer disputes, fewer surprises after move-in. Screening is included in the management fee — there is no separate charge for finding tenants.
              </p>
            </div>

            <hr className="border-cream-200" />

            {/* Rent Collection */}
            <div>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
                Rent Collection &amp; Payouts
              </h2>
              <p className="mb-4">
                Rent is collected through M-Pesa Paybill or bank transfer. Tenants receive an automated reminder before the due date. The moment payment lands, both you and your tenant get instant confirmation — no chasing anyone for proof of payment.
              </p>
              <p className="mb-4">
                Your payout lands in your account by the 5th of every month, accompanied by an itemised statement showing exactly what was collected, what was spent on maintenance or other approved costs, and what the net amount is. If a tenant pays KES 50,000, our fee is KES 5,000 — that is the only deduction.
              </p>
              <p>
                If a tenant falls behind, we follow up the same day. By day three, we escalate. You are notified at each step, not after the fact.
              </p>
            </div>

            <hr className="border-cream-200" />

            {/* Maintenance */}
            <div>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
                Maintenance Coordination
              </h2>
              <p className="mb-4">
                When something breaks, the tenant logs a request. It gets assigned to a vetted contractor from our pre-approved network across Nairobi, tracked through to completion, and documented with photos and invoices.
              </p>
              <p className="mb-4">
                Anything that will cost more than KES 10,000 comes to you for approval first — we do not spend your money without asking. Routine repairs below that threshold are handled by our maintenance team for faster resolution, with full documentation sent to you after the fact.
              </p>
              <p>
                For emergencies — water leaks, electrical hazards, security breaches — we act immediately and notify you in parallel. The priority is protecting your property and your tenant&apos;s safety, not waiting for an approval that can come later.
              </p>
            </div>

            <hr className="border-cream-200" />

            {/* Tenant Relations */}
            <div>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
                Tenant Relations
              </h2>
              <p className="mb-4">
                We are the day-to-day point of contact for your tenants. Complaints, questions, routine requests, lease clarifications — all of it comes to us instead of your phone at midnight.
              </p>
              <p className="mb-4">
                This includes managing move-ins and move-outs, conducting scheduled inspections with photo reports, handling lease renewals and rent reviews, and resolving disputes before they escalate to formal proceedings.
              </p>
              <p>
                You get a monthly report summarising tenant communications, outstanding issues, and any decisions that need your input. The goal is that you stay informed without being in the middle of everything.
              </p>
            </div>

            <hr className="border-cream-200" />

            {/* Legal & Compliance */}
            <div>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
                Legal &amp; Compliance
              </h2>
              <p className="mb-4">
                Every lease we draft complies with Kenya&apos;s Landlord and Tenant Act. Clauses are written in plain language, cover the scenarios that actually come up (subletting, early termination, deposit deductions), and protect both parties.
              </p>
              <p className="mb-4">
                Where a notice needs to be served, we handle the documentation and delivery through the correct legal process. Where an eviction becomes necessary, we support you through the Rent Tribunal — not through shortcuts that create bigger legal problems later.
              </p>
              <p>
                Deposit management is documented from day one: condition reports at move-in, photographic evidence at move-out, and itemised deduction statements that hold up if challenged.
              </p>
            </div>

            <hr className="border-cream-200" />

            {/* Vacancy Marketing */}
            <div>
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
                Vacancy Marketing
              </h2>
              <p className="mb-4">
                When a unit becomes vacant, we move fast. Professional photography, listings on BuyRentKenya, Property24, and Jumia House, plus distribution through our own tenant network and WhatsApp groups.
              </p>
              <p className="mb-4">
                We coordinate viewings, shortlist applicants (using the same screening process above), and present you with qualified candidates. The goal is to minimise empty days — every day a unit sits vacant costs you money.
              </p>
              <p>
                You are not charged for a vacancy we have not managed to fill. Our fee only applies to rent actually collected.
              </p>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="mt-16 pt-12 border-t border-cream-200">
            <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
              Pricing
            </h2>
            <p className="text-navy-600 text-[15px] leading-[1.85] mb-4">
              All six services above are included in a single fee: 10% of gross receipts collected through Emalink. There is no setup cost, no per-unit charge, and no fee for vacant units. If we collect nothing, you pay nothing.
            </p>
            <p className="text-navy-600 text-[15px] leading-[1.85] mb-8">
              Cancellation requires 30 days written notice. No penalties. All records are handed over cleanly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton href="/contact" variant="gold" size="lg">
                Get a Proposal
              </LinkButton>
              <LinkButton href="/pricing" variant="outline" size="lg">
                Pricing Details
              </LinkButton>
            </div>
          </div>

          {/* Neighborhoods */}
          <div className="mt-16 pt-12 border-t border-cream-200">
            <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-navy-800 mb-4">
              Where we operate
            </h2>
            <p className="text-navy-600 text-[15px] leading-[1.85]">
              Westlands · Kilimani · Lavington · Karen · South B · South C · Langata · Kileleshwa · Upperhill · Parklands
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
