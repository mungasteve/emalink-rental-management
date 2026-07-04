import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { TrustStrip } from "@/components/home/trust-strip";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <TrustStrip />
      <ContactCTA />
    </>
  );
}
