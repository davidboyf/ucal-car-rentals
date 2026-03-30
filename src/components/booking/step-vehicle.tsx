"use client";

import Image from "next/image";
import { Users, Briefcase, Gauge, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { vehicles } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";
import type { BookingFormData } from "@/types";

interface Props {
  formData: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepVehicle({ formData, update, onNext, onPrev }: Props) {
  const days = formData.pickupDate && formData.returnDate
    ? Math.max(
        1,
        Math.ceil(
          (new Date(formData.returnDate).getTime() - new Date(formData.pickupDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 1;

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-white font-bold text-2xl mb-1">Choose Your Vehicle</h2>
      <p className="text-gray-400 text-sm mb-8">
        Select a vehicle for your {days} day{days !== 1 ? "s" : ""} rental.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => {
          const selected = formData.vehicleId === vehicle.id;
          return (
            <button
              key={vehicle.id}
              onClick={() => update({ vehicleId: vehicle.id })}
              className={cn(
                "text-left group border rounded-2xl overflow-hidden transition-all",
                selected
                  ? "border-[#D4A017] bg-[#D4A017]/5"
                  : "border-white/10 bg-white/3 hover:border-white/20"
              )}
            >
              <div className="flex gap-0">
                {/* Image */}
                <div className="relative w-32 h-28 shrink-0 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                  {selected && (
                    <div className="absolute inset-0 bg-[#D4A017]/20 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#D4A017] flex items-center justify-center">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-semibold text-sm leading-tight">{vehicle.name}</h3>
                      <span className="text-[10px] text-gray-500 capitalize shrink-0">{vehicle.category}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" /> {vehicle.seats}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Briefcase className="w-3 h-3" /> {vehicle.luggage}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Gauge className="w-3 h-3" /> {vehicle.transmission === "automatic" ? "Auto" : "Manual"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[#D4A017] font-bold">{formatCurrency(vehicle.pricePerDay)}</span>
                      <span className="text-gray-600 text-xs">/day</span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      Total: {formatCurrency(vehicle.pricePerDay * days)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-gray-400 hover:text-white font-medium rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!formData.vehicleId}
          className="flex items-center gap-2 px-8 py-3 bg-[#D4A017] hover:bg-[#F0C040] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
