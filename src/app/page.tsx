import { Hero } from "@/components/sections/hero";
import { WhyUs } from "@/components/sections/why-us";
import { FleetPreview } from "@/components/sections/fleet-preview";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CharterBanner } from "@/components/sections/charter-banner";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <FleetPreview />
      <HowItWorks />
      <CharterBanner />
      <Testimonials />
    </>
  );
}
