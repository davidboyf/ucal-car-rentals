import { Crown, Star } from "lucide-react";

export function CharterHero() {
  return (
    <div className="relative py-24 bg-[#060608] overflow-hidden border-b border-white/8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/8 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-5 h-5 text-[#D4A017]" />
            <span className="text-[#D4A017] text-sm uppercase tracking-[0.2em]">Luxury Charter</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Private
            <br />
            <span className="text-[#D4A017]">Jamaica Experience.</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
            A professional driver. A premium vehicle. The whole island at your disposal.
            Our Luxury Charter Service is for those who expect — and deserve — the best.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              "Professional uniformed driver",
              "Premium-class vehicles",
              "Complimentary water & amenities",
              "Door-to-door service",
              "Custom itineraries",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
