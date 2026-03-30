import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";

const services = [
  "Airport Transfers",
  "Wedding Transport",
  "Corporate Events",
  "Island Tours",
  "Private Excursions",
  "Special Occasions",
];

export function CharterBanner() {
  return (
    <section className="py-24 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#1A1200] via-[#111827] to-[#0A0A0F] border border-[#D4A017]/20 rounded-3xl overflow-hidden p-10 lg:p-16">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A017]/3 rounded-full blur-2xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-5 h-5 text-[#D4A017]" />
                <span className="text-[#D4A017] text-sm uppercase tracking-[0.2em]">
                  Premium Service
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Travel Like You
                <br />
                <span className="text-[#D4A017]">Deserve To.</span>
              </h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our Luxury Charter Service pairs you with a professional, uniformed driver
                in a premium vehicle. Whether it&apos;s a wedding, a corporate transfer,
                or a private island tour — we deliver an experience as beautiful as Jamaica itself.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1.5 bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#D4A017] text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <Link
                href="/charter"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4A017] hover:bg-[#F0C040] text-black font-bold rounded-xl transition-colors group"
              >
                Explore Charter Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10+", label: "Years of Service" },
                { value: "5,000+", label: "Happy Customers" },
                { value: "50+", label: "Vehicles in Fleet" },
                { value: "24/7", label: "Available Support" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="font-display text-3xl font-bold text-[#D4A017] mb-1">
                    {value}
                  </div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
