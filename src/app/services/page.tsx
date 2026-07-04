import { Building, Users, Wrench, DollarSign, Scale, Megaphone, CheckCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

const services = [
  {
    icon: Building,
    title: "Property Management",
    description:
      "We act as the operational layer between you and your property. Inspections, renewals, tenant communications — you get a monthly report, not a daily headache.",
    features: [
      "Dedicated property manager assigned to your units",
      "Scheduled and ad-hoc inspections with photo reports",
      "Lease renewal management and rent reviews",
      "Vacancy turnaround within 30 days or we waive our fee",
    ],
  },
  {
    icon: Users,
    title: "Tenant Screening",
    description:
      "We don't just find tenants — we find the right ones. Every applicant goes through a structured vetting process before we recommend them to you.",
    features: [
      "Employment and income verification",
      "Previous landlord reference checks",
      "ID and KRA PIN verification",
      "Blacklist and court record checks",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Issues get logged, assigned to vetted contractors, and tracked to completion. You approve anything above your set cost threshold — nothing more.",
    features: [
      "24/7 emergency response line for tenants",
      "Pre-approved contractor network across Nairobi",
      "Cost approval workflow for owner control",
      "Completion photos and contractor invoices on file",
    ],
  },
  {
    icon: DollarSign,
    title: "Rent Collection & Payouts",
    description:
      "M-Pesa and bank collection with automated reminders. Rent lands in your account by the 5th of every month, with a full statement attached.",
    features: [
      "M-Pesa Paybill and bank transfer collection",
      "Automated tenant reminders before due date",
      "Owner payouts by the 5th of each month",
      "Itemised monthly statements with every transaction",
    ],
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    description:
      "Lease drafting, notice periods, and eviction support — all within Kenya's Landlord and Tenant Act. We keep you protected without you needing to know the Act.",
    features: [
      "Legally compliant lease agreements",
      "Proper notice procedures and documentation",
      "Eviction support through the Rent Tribunal",
      "Deposit management and deduction documentation",
    ],
  },
  {
    icon: Megaphone,
    title: "Vacancy Marketing",
    description:
      "When a unit becomes vacant, we move fast. Professional photos, listings on major Kenyan portals, and our own tenant network to minimise empty days.",
    features: [
      "Professional property photography",
      "Listings on BuyRentKenya, Jumia House, and more",
      "Social media and WhatsApp network marketing",
      "Viewing coordination and applicant shortlisting",
    ],
  },
];

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
            Pick what you need or hand us the whole operation. Either way, you
            stay in control without being in the middle of everything.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="border border-border rounded-xl p-6 hover:border-navy-800/30 hover:shadow-md transition-all">
                <div className="h-11 w-11 rounded-lg bg-navy-800 flex items-center justify-center mb-4">
                  <service.icon className="h-5 w-5 text-gold-400" />
                </div>
                <h2 className="font-semibold text-navy-800 text-base mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-gold-500/20 rounded-2xl p-8 sm:p-10 bg-cream-50 text-center">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-navy-800 mb-3">
              Not sure what you need?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Tell us about your property and we&apos;ll put together a
              management proposal within 48 hours. No obligation.
            </p>
            <LinkButton href="/contact" variant="gold" size="lg" className="px-8">
              Get a Proposal
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
