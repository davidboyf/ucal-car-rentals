import { Plane, Heart, Briefcase, Map, PartyPopper, Clock } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description:
      "Meet & greet service at Norman Manley or Sangster International. We monitor your flight, handle your luggage, and have you at your destination in comfort.",
    price: "From $80",
  },
  {
    icon: Heart,
    title: "Wedding Transport",
    description:
      "Make your wedding day perfect from the first mile. Bridal parties, guest shuttles, and honeymoon transfers — handled with elegance and precision.",
    price: "From $250",
  },
  {
    icon: Briefcase,
    title: "Corporate Charter",
    description:
      "Executive transfers, conference shuttles, and team outings for corporate clients. Reliable, professional, and always on time.",
    price: "From $120/hr",
  },
  {
    icon: Map,
    title: "Private Island Tours",
    description:
      "Full-day or half-day guided tours across Jamaica. Dunn's River Falls, Blue Mountains, Port Antonio, Negril — we design the route around you.",
    price: "From $200/day",
  },
  {
    icon: PartyPopper,
    title: "Special Events",
    description:
      "Concert nights, graduations, anniversaries, and private celebrations. Arrive in style, leave with memories.",
    price: "From $150",
  },
  {
    icon: Clock,
    title: "Hourly Charter",
    description:
      "Need a driver on standby for a few hours? Book our hourly charter for complete flexibility during your stay.",
    price: "From $80/hr",
  },
];

export function CharterServices() {
  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Services</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Every Occasion,
            <br />
            <span className="text-[#D4A017]">Covered.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From airport arrivals to wedding sendoffs, our charter service adapts to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, price }) => (
            <div
              key={title}
              className="group p-6 bg-[#111827] border border-white/8 rounded-2xl hover:border-[#D4A017]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#D4A017]/10 flex items-center justify-center group-hover:bg-[#D4A017]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#D4A017]" />
                </div>
                <span className="text-[#D4A017] text-sm font-semibold">{price}</span>
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
