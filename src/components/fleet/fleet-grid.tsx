"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, Gauge, Fuel, Check, SlidersHorizontal } from "lucide-react";
import { vehicles } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";
import type { Vehicle } from "@/types";

const categories = [
  { value: "all", label: "All Vehicles" },
  { value: "economy", label: "Economy" },
  { value: "compact", label: "Compact" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "van", label: "Van / Minibus" },
  { value: "pickup", label: "Pickup" },
];

export function FleetGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("price-asc");

  const filtered: Vehicle[] = vehicles
    .filter((v) => activeCategory === "all" || v.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePerDay - b.pricePerDay;
      if (sortBy === "price-desc") return b.pricePerDay - a.pricePerDay;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                activeCategory === cat.value
                  ? "bg-[#D4A017] text-black"
                  : "bg-[#111827] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-[#111827] border border-white/10 text-gray-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4A017]/50 [color-scheme:dark]"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="text-gray-500 text-sm mb-6">
        Showing {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="group bg-[#111827] border border-white/8 rounded-2xl overflow-hidden hover:border-[#D4A017]/30 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#1F2937]">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2.5 py-1 bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300 capitalize">
            {vehicle.category}
          </span>
          {vehicle.available && (
            <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs text-emerald-400">
              Available
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-bold text-xl mb-1">{vehicle.name}</h3>
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">{vehicle.description}</p>

        {/* Specs row */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { icon: Users, label: `${vehicle.seats} seats` },
            { icon: Briefcase, label: `${vehicle.luggage} bags` },
            { icon: Gauge, label: vehicle.transmission === "automatic" ? "Auto" : "Manual" },
            { icon: Fuel, label: vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1) },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 p-2.5 bg-white/5 rounded-xl">
              <Icon className="w-4 h-4 text-[#D4A017]" />
              <span className="text-xs text-gray-400 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-1.5 mb-6">
          {vehicle.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-gray-400">
              <Check className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
              {feature}
            </div>
          ))}
          {vehicle.features.length > 3 && (
            <p className="text-xs text-gray-600 ml-5">
              +{vehicle.features.length - 3} more features
            </p>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/8">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#D4A017] font-bold text-2xl">
                {formatCurrency(vehicle.pricePerDay)}
              </span>
              <span className="text-gray-500 text-sm">/day</span>
            </div>
            <p className="text-gray-600 text-xs">
              ~{formatCurrency(vehicle.pricePerDay * 7)}/week
            </p>
          </div>
          <Link
            href={`/reservations?vehicle=${vehicle.id}`}
            className="px-6 py-2.5 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm rounded-xl transition-colors"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
}
