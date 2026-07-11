import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Testimonials } from "@/components/home/testimonials";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
