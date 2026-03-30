"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, ChevronRight, Star, Shield, Clock } from "lucide-react";
import { locations } from "@/lib/data";

export function Hero() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (pickupDate) params.set("from", pickupDate);
    if (returnDate) params.set("to", returnDate);
    router.push(`/reservations?${params.toString()}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/80 via-[#0A0A0F]/60 to-[#0A0A0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]/30" />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A017]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A017]/15 border border-[#D4A017]/30 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
            <span className="text-[#D4A017] text-xs font-medium tracking-wider uppercase">
              Jamaica&apos;s Premier Car Rental Service
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            Explore Jamaica{" "}
            <span className="text-[#D4A017]">on Your</span>
            <br />
            <span className="text-[#D4A017]">Own Terms.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Premium car rentals and luxury charter services across the island.
            From airport pickup to hidden beaches — we get you there in style.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { icon: Shield, text: "Fully Insured" },
              { icon: Clock, text: "24/7 Airport Pickup" },
              { icon: Star, text: "5-Star Rated" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon className="w-4 h-4 text-[#D4A017]" />
                {text}
              </div>
            ))}
          </div>

          {/* Search/booking bar */}
          <form
            onSubmit={handleSearch}
            className="bg-[#111827]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Pickup Location
                </label>
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4A017]/50 focus:bg-white/8 transition-colors"
                >
                  <option value="">Select location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#111827]">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup date */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Return date */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split("T")[0]}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#D4A017] hover:bg-[#F0C040] text-black font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Search Available Vehicles
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link
                href="/charter"
                className="px-6 py-3 border border-white/20 hover:border-[#D4A017]/50 text-gray-300 hover:text-white font-medium rounded-xl transition-colors text-center text-sm"
              >
                Luxury Charter →
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
