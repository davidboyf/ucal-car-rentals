"use client";

import { MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
import { locations } from "@/lib/data";
import type { BookingFormData } from "@/types";

interface Props {
  formData: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
}

const times = Array.from({ length: 28 }, (_, i) => {
  const h = Math.floor(i / 2) + 6;
  const m = i % 2 === 0 ? "00" : "30";
  const hour = h > 12 ? h - 12 : h;
  const ampm = h >= 12 ? "PM" : "AM";
  return { value: `${String(h).padStart(2, "0")}:${m}`, label: `${hour}:${m} ${ampm}` };
});

export function StepDates({ formData, update, onNext }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const isValid =
    formData.pickupLocation &&
    formData.pickupDate &&
    formData.returnDate &&
    formData.pickupDate <= formData.returnDate;

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-white font-bold text-2xl mb-1">Dates & Location</h2>
      <p className="text-gray-400 text-sm mb-8">Where and when do you need the vehicle?</p>

      <div className="space-y-6">
        {/* Pickup Location */}
        <div>
          <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
            Pickup Location
          </label>
          <select
            value={formData.pickupLocation}
            onChange={(e) => update({ pickupLocation: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
          >
            <option value="">Select pickup location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-[#111827]">{loc}</option>
            ))}
          </select>
        </div>

        {/* Return location same? */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="sameReturn"
            checked={formData.returnLocation === formData.pickupLocation}
            onChange={(e) =>
              update({
                returnLocation: e.target.checked ? formData.pickupLocation : "",
              })
            }
            className="w-4 h-4 accent-[#D4A017]"
          />
          <label htmlFor="sameReturn" className="text-sm text-gray-400 cursor-pointer">
            Return to same location
          </label>
        </div>

        {formData.returnLocation !== formData.pickupLocation && (
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
              Return Location
            </label>
            <select
              value={formData.returnLocation}
              onChange={(e) => update({ returnLocation: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
            >
              <option value="">Select return location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc} className="bg-[#111827]">{loc}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#D4A017]" />
              Pickup Date
            </label>
            <input
              type="date"
              value={formData.pickupDate}
              min={today}
              onChange={(e) => update({ pickupDate: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#D4A017]" />
              Return Date
            </label>
            <input
              type="date"
              value={formData.returnDate}
              min={formData.pickupDate || today}
              onChange={(e) => update({ returnDate: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
              Pickup Time
            </label>
            <select
              value={formData.pickupTime}
              onChange={(e) => update({ pickupTime: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
            >
              {times.map((t) => (
                <option key={t.value} value={t.value} className="bg-[#111827]">{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
              Return Time
            </label>
            <select
              value={formData.returnTime}
              onChange={(e) => update({ returnTime: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A017]/50 transition-colors [color-scheme:dark]"
            >
              {times.map((t) => (
                <option key={t.value} value={t.value} className="bg-[#111827]">{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex items-center gap-2 px-8 py-3 bg-[#D4A017] hover:bg-[#F0C040] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
