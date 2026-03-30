import type { Metadata } from "next";
import { FleetGrid } from "@/components/fleet/fleet-grid";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Browse Ucal's full fleet of rental vehicles — from economy cars to luxury sedans and SUVs. Filter by category, seats, and price. Available across Jamaica.",
};

export default function FleetPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="relative py-20 bg-[#060608] border-b border-white/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Our Vehicles</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            The Full Fleet
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Economy to luxury — every vehicle in our fleet is fully serviced,
            air-conditioned, and ready to take you anywhere on the island.
          </p>
        </div>
      </div>

      <FleetGrid />
    </div>
  );
}
