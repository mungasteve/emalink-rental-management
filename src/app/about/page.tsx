export default function AboutPage() {
  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-w-2xl">
          <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
            About Emalink
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            We started because landlords in Kenya deserve better tools.
          </h1>
          <p className="text-white/55 text-sm leading-relaxed max-w-xl">
            Most property management in Kenya still runs on WhatsApp messages,
            handwritten receipts, and phone calls that go unanswered. We&apos;re
            building the infrastructure to change that.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-navy-600 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
                The problem we&apos;re solving
              </p>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-navy-800 mb-6 leading-tight">
                Property ownership in Kenya is harder than it should be.
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Landlords chase rent manually every month. Tenants have no
                  formal way to report issues. Maintenance requests get lost.
                  Financial records are scattered across M-Pesa statements and
                  notebooks.
                </p>
                <p>
                  Emalink is a property management platform built specifically
                  for the Kenyan market — M-Pesa integrated, legally compliant,
                  and designed for the way property actually works here.
                </p>
                <p>
                  We handle the operations so owners can focus on growing their
                  portfolio, and tenants get a rental experience that actually
                  respects their time.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Transparency over everything",
                  desc: "Every transaction, every maintenance request, every communication is logged and visible to the right people. No surprises at month end.",
                },
                {
                  title: "Built for Kenya, not adapted for it",
                  desc: "M-Pesa collection, EARB compliance, Kenyan lease law — these aren't afterthoughts. They're the foundation.",
                },
                {
                  title: "We're accountable to both sides",
                  desc: "We work for property owners, but we treat tenants like customers. A good tenant relationship is the best asset protection there is.",
                },
              ].map((v) => (
                <div key={v.title} className="border-l-2 border-navy-800/10 pl-5 hover:border-gold-500 transition-colors">
                  <h3 className="font-semibold text-navy-800 text-sm mb-1.5">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto">
          <p className="text-gold-300 font-semibold text-xs uppercase tracking-[0.15em] mb-3">
            Where we are
          </p>
          <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-4">
            Currently onboarding our first properties.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-lg mx-auto">
            We&apos;re in early access. If you own property in Nairobi and want
            a management partner who will actually pick up the phone — we&apos;d
            like to talk.
          </p>
        </div>
      </section>
    </div>
  );
}
