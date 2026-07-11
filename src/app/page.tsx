import { Hero } from "@/components/home/hero";
import { ServicesAndWhy } from "@/components/home/services-and-why";
import { Testimonials } from "@/components/home/testimonials";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesAndWhy />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
