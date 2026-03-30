import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/booking-wizard";

export const metadata: Metadata = {
  title: "Book a Vehicle",
  description:
    "Reserve your vehicle online in minutes. Select your dates, choose your car, and confirm your booking. Instant confirmation for all Jamaica locations.",
};

export default function ReservationsPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0A0A0F]">
      {/* Header */}
      <div className="relative py-16 bg-[#060608] border-b border-white/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Reservations</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Book Your Vehicle
          </h1>
          <p className="text-gray-400 text-lg">
            Complete the steps below. Takes less than 3 minutes.
          </p>
        </div>
      </div>

      <BookingWizard />
    </div>
  );
}
