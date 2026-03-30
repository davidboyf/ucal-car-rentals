import { Shield, Clock, MapPin, Headphones, CreditCard, Star } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Airport Pickup",
    description:
      "We monitor all flight arrivals. Your vehicle is ready when you land — no matter the hour.",
  },
  {
    icon: Shield,
    title: "Fully Insured Fleet",
    description:
      "Every vehicle comes with basic liability coverage. Upgrade to full CDW for complete peace of mind.",
  },
  {
    icon: MapPin,
    title: "Island-Wide Coverage",
    description:
      "Pickups in Kingston, Montego Bay, and hotel delivery across the island. Wherever you are.",
  },
  {
    icon: Star,
    title: "Premium Fleet",
    description:
      "From fuel-efficient economy cars to luxury sedans — all regularly serviced and spotlessly clean.",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    description:
      "What you see is what you pay. No hidden fees, no surprises. Just clear, honest pricing.",
  },
  {
    icon: Headphones,
    title: "Local Expert Support",
    description:
      "Our team knows Jamaica inside out. We're here to help with routes, tips, and anything you need.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">
            Why Choose Ucal
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for Travelers.
            <br />
            <span className="text-[#D4A017]">Trusted by Locals.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;ve been serving visitors and Jamaicans alike for over a decade.
            Here&apos;s what makes us different.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 bg-[#111827] border border-white/8 rounded-2xl hover:border-[#D4A017]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4A017]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4A017]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#D4A017]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
