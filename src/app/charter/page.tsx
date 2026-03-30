import type { Metadata } from "next";
import { CharterHero } from "@/components/charter/charter-hero";
import { CharterServices } from "@/components/charter/charter-services";
import { CharterBookingForm } from "@/components/charter/charter-booking-form";

export const metadata: Metadata = {
  title: "Luxury Charter Service",
  description:
    "Premium luxury charter service in Jamaica. Professional drivers, premium vehicles, airport transfers, weddings, corporate events, and private island tours.",
};

export default function CharterPage() {
  return (
    <div className="min-h-screen pt-20">
      <CharterHero />
      <CharterServices />
      <CharterBookingForm />
    </div>
  );
}
