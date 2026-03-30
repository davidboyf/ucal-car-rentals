import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Modify Reservation",
  description: "Modify or cancel an existing Ucal Car Rentals reservation.",
};

export default function ModifyReservationPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#0A0A0F]">
      <div className="relative py-16 bg-[#060608] border-b border-white/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Reservations</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Modify Your Booking
          </h1>
          <p className="text-gray-400 text-lg">
            Update dates, vehicle, or cancel your reservation.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-16">
        <div className="bg-[#111827] border border-white/8 rounded-2xl p-8">
          <h2 className="text-white font-semibold text-xl mb-2">Find Your Reservation</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enter your booking reference number and email address.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Booking Reference</label>
              <input
                type="text"
                placeholder="e.g. UCL-123456"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A017]/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A017]/50 transition-colors"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold rounded-xl transition-colors">
              <Search className="w-4 h-4" />
              Find Reservation
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Can&apos;t find your booking?{" "}
            <Link href="/contact" className="text-[#D4A017] hover:underline">
              Contact us directly
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
