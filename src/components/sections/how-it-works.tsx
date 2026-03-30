import Link from "next/link";
import { Search, Car, Key, Smile } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Choose Your Vehicle",
    description: "Browse our fleet and pick the perfect car for your trip. Filter by category, price, and features.",
  },
  {
    step: "02",
    icon: Car,
    title: "Book in Minutes",
    description: "Fill out a simple form with your details, dates, and pickup location. Confirmation is instant.",
  },
  {
    step: "03",
    icon: Key,
    title: "Pick Up & Go",
    description: "Meet us at the airport, our office, or your hotel. Your clean, fueled vehicle will be ready.",
  },
  {
    step: "04",
    icon: Smile,
    title: "Enjoy Jamaica",
    description: "Hit the road. Mountains, beaches, towns — the island is yours. Return when you're ready.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Process</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            On the Road in 4 Steps
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We made the rental process as smooth as a Jamaican drive at sunset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, icon: Icon, title, description }, index) => (
            <div key={step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#D4A017]/30 to-transparent z-0" />
              )}

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4A017]/10 border border-[#D4A017]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-[#D4A017]" />
                  </div>
                  <span className="font-display text-4xl font-bold text-white/10">{step}</span>
                </div>
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/reservations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4A017] hover:bg-[#F0C040] text-black font-bold rounded-xl transition-colors text-lg"
          >
            Reserve Your Vehicle Now
          </Link>
        </div>
      </div>
    </section>
  );
}
