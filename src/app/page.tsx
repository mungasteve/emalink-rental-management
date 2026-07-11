import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
