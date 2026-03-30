import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Heart, Users, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ucal Car Rentals — Jamaica's trusted car rental and luxury charter company. Over a decade of serving visitors and locals across the island.",
};

const values = [
  {
    icon: Heart,
    title: "Island Pride",
    description:
      "We are Jamaican. We love this island and it shows in everything we do — from the routes we recommend to the warmth we bring to every interaction.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every vehicle is regularly serviced and fully insured. We don't cut corners on maintenance because your safety is the only thing that matters.",
  },
  {
    icon: Users,
    title: "People Over Profit",
    description:
      "We treat every customer like family. Whether it's your first trip or your tenth, you'll always feel welcomed, respected, and taken care of.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    description:
      "We hold ourselves to a high standard. Clean vehicles, punctual service, honest pricing — no exceptions.",
  },
];

const team = [
  {
    name: "Ucal Brown",
    role: "Founder & CEO",
    bio: "Born and raised in Kingston, Ucal founded the company with one vehicle and a vision to change how people experience Jamaica. Over 10 years later, that vision is a fleet of 50+ vehicles and thousands of happy customers.",
  },
  {
    name: "Marcia Thompson",
    role: "Operations Manager",
    bio: "Marcia ensures every booking runs smoothly — from fleet maintenance to driver scheduling. Her attention to detail is why Ucal's service is consistently five stars.",
  },
  {
    name: "Devon Clarke",
    role: "Head of Charter Services",
    bio: "Devon manages our luxury charter division, personally overseeing every corporate and wedding booking. His commitment to excellence has made Ucal the preferred choice for high-end clients.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-24 bg-[#060608] border-b border-white/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Our Story</p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Born in Jamaica.
              <br />
              <span className="text-[#D4A017]">Built for Jamaica.</span>
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              Ucal Car Rentals started with one vehicle, one driver, and one belief:
              that getting around Jamaica should be as beautiful as the island itself.
              Today, we serve thousands of visitors and locals every year — and that belief has never changed.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-6">
                More Than a Rental Company
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  It started in 2013. Ucal Brown had a single Toyota Corolla and a phone. Within a year,
                  word of mouth had grown the fleet to five. Within five years, thirty. Today, we operate
                  over 50 vehicles and one of Jamaica&apos;s most trusted luxury charter services.
                </p>
                <p>
                  We&apos;ve driven couples to their weddings, executives to their meetings, families to
                  Dunn&apos;s River Falls, and solo travelers to corners of the island most tourists never see.
                  Each trip is a chance to show our customers the best of what this country has to offer.
                </p>
                <p>
                  We&apos;re not just in the business of renting cars. We&apos;re in the business of creating
                  experiences — and we take that seriously.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2013", label: "Founded" },
                { value: "50+", label: "Vehicles" },
                { value: "5,000+", label: "Happy Customers" },
                { value: "4.9★", label: "Average Rating" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#111827] border border-white/8 rounded-2xl p-6 text-center"
                >
                  <div className="font-display text-3xl font-bold text-[#D4A017] mb-1">{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">What Drives Us</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 bg-[#111827] border border-white/8 rounded-2xl flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#D4A017]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#D4A017]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">The People</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map(({ name, role, bio }) => (
              <div key={name} className="p-6 bg-[#111827] border border-white/8 rounded-2xl">
                <div className="w-14 h-14 rounded-2xl bg-[#D4A017]/10 flex items-center justify-center mb-5">
                  <span className="text-[#D4A017] text-xl font-bold font-display">
                    {name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
                <p className="text-[#D4A017] text-sm mb-4">{role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060608] border-t border-white/8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Book your vehicle or charter service today and see why thousands of travelers choose Ucal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservations"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#D4A017] hover:bg-[#F0C040] text-black font-bold rounded-xl transition-colors"
            >
              Book a Vehicle
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/charter"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-[#D4A017]/50 text-gray-300 hover:text-white font-medium rounded-xl transition-colors"
            >
              Luxury Charter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
