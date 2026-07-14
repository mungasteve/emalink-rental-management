import { LinkButton } from "@/components/ui/link-button";

export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70 text-sm">Last updated: July 2025</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-navy">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mb-3">
            What we collect
          </h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-6">
            When you contact us through our website, we collect your name, email address, phone number (if provided), and message content. This information is used solely to respond to your inquiry.
          </p>

          <h2 className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mb-3">
            How we use it
          </h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-6">
            Your information is used to respond to inquiries, provide property management services, and communicate updates relevant to your property or tenancy. We do not sell or share your data with third parties for marketing purposes.
          </p>

          <h2 className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mb-3">
            Data storage
          </h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-6">
            Data is stored securely using industry-standard encryption. We retain your information only as long as necessary to provide our services or as required by Kenyan law.
          </p>

          <h2 className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mb-3">
            Your rights
          </h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-6">
            You may request access to, correction of, or deletion of your personal data at any time by contacting us at info@emalink.co.ke.
          </p>

          <h2 className="font-[var(--font-heading)] text-xl font-bold text-navy-800 mb-3">
            Contact
          </h2>
          <p className="text-navy-600 text-sm leading-relaxed mb-8">
            For privacy-related questions, email info@emalink.co.ke.
          </p>

          <LinkButton href="/contact" variant="outline" size="sm">
            Contact Us
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
