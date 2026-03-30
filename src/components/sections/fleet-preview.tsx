import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, Gauge, ArrowRight } from "lucide-react";
import { vehicles } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const featured = vehicles.slice(0, 4);

export function FleetPreview() {
  return (
    <section className="py-24 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Our Vehicles</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Choose Your Ride
            </h2>
          </div>
          <Link
            href="/fleet"
            className="flex items-center gap-2 text-[#D4A017] hover:text-[#F0C040] font-medium text-sm transition-colors group whitespace-nowrap"
          >
            View Full Fleet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-[#111827] border border-white/8 rounded-2xl overflow-hidden hover:border-[#D4A017]/30 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-[#1F2937]">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300 capitalize">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-base mb-1">{vehicle.name}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{vehicle.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
                  <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span className="text-xs text-gray-400">{vehicle.seats}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                    <Briefcase className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span className="text-xs text-gray-400">{vehicle.luggage}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                    <Gauge className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span className="text-xs text-gray-400 capitalize">{vehicle.transmission.slice(0, 4)}</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#D4A017] font-bold text-xl">
                      {formatCurrency(vehicle.pricePerDay)}
                    </span>
                    <span className="text-gray-500 text-xs ml-1">/day</span>
                  </div>
                  <Link
                    href={`/reservations?vehicle=${vehicle.id}`}
                    className="px-4 py-2 bg-[#D4A017]/10 hover:bg-[#D4A017] text-[#D4A017] hover:text-black font-medium text-sm rounded-xl transition-all"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
