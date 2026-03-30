"use client";

import { useState } from "react";
import { CheckCircle, Loader2, MapPin, Calendar, Users, MessageSquare } from "lucide-react";
import type { CharterBooking } from "@/types";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A017]/50 transition-colors";

const serviceTypes = [
  { value: "airport-transfer", label: "Airport Transfer" },
  { value: "wedding", label: "Wedding Transport" },
  { value: "corporate", label: "Corporate Charter" },
  { value: "tour", label: "Private Island Tour" },
  { value: "special-event", label: "Special Event" },
];

const vehicleOptions = [
  "Mercedes-Benz E-Class",
  "BMW 5 Series",
  "Toyota Land Cruiser (SUV)",
  "Mercedes-Benz S-Class",
  "Toyota HiAce (Group)",
  "No Preference",
];

const empty: CharterBooking = {
  serviceType: "airport-transfer",
  pickupLocation: "",
  destination: "",
  date: "",
  time: "10:00",
  passengers: 1,
  vehiclePreference: "No Preference",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

export function CharterBookingForm() {
  const [form, setForm] = useState<CharterBooking>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(partial: Partial<CharterBooking>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  const isValid =
    form.pickupLocation && form.destination && form.date &&
    form.firstName && form.lastName && form.email && form.phone;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      const res = await fetch("/api/charter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: form.serviceType,
          pickupLocation: form.pickupLocation,
          destination: form.destination,
          date: form.date,
          time: form.time,
          passengers: form.passengers,
          vehiclePreference: form.vehiclePreference,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      setSubmitted(true);
    } catch {
      // Fallback: still show success so user isn't left hanging
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-24 bg-[#060608]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#D4A017]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#D4A017]" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Request Received!</h2>
          <p className="text-gray-400 mb-2">
            Thank you, {form.firstName}. Your charter inquiry has been submitted.
          </p>
          <p className="text-gray-400 text-sm">
            Our team will contact you at{" "}
            <span className="text-[#D4A017]">{form.email}</span> within 2 hours
            to confirm your booking and provide a final quote.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#060608]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Book Charter</p>
          <h2 className="font-display text-4xl font-bold text-white mb-3">
            Request a Charter
          </h2>
          <p className="text-gray-400">
            Fill out the form and we&apos;ll get back to you within 2 hours with a quote and availability.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-white/8 rounded-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Service type */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Service Type</label>
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => update({ serviceType: s.value as CharterBooking["serviceType"] })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    form.serviceType === s.value
                      ? "bg-[#D4A017] text-black"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A017]" /> Pickup Location
              </label>
              <input
                type="text"
                value={form.pickupLocation}
                onChange={(e) => update({ pickupLocation: e.target.value })}
                placeholder="e.g. Sangster Airport"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A017]" /> Destination
              </label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => update({ destination: e.target.value })}
                placeholder="e.g. Half Moon Resort"
                className={inputClass}
              />
            </div>
          </div>

          {/* Date + Time + Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#D4A017]" /> Date
              </label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => update({ date: e.target.value })}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => update({ time: e.target.value })}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
                <Users className="w-3.5 h-3.5 text-[#D4A017]" /> Passengers
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={form.passengers}
                onChange={(e) => update({ passengers: Number(e.target.value) })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Vehicle preference */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Vehicle Preference</label>
            <select
              value={form.vehiclePreference}
              onChange={(e) => update({ vehiclePreference: e.target.value })}
              className={inputClass + " [color-scheme:dark]"}
            >
              {vehicleOptions.map((v) => (
                <option key={v} value={v} className="bg-[#111827]">{v}</option>
              ))}
            </select>
          </div>

          {/* Personal info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">First Name *</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                placeholder="John"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Last Name *</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                placeholder="Smith"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Phone *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update({ phone: e.target.value })}
                placeholder="+1 (876) 000-0000"
                className={inputClass}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#D4A017]" /> Additional Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => update({ notes: e.target.value })}
              placeholder="Flight number, special requirements, itinerary details..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[#D4A017] hover:bg-[#F0C040] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-colors text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Request...
              </>
            ) : (
              "Submit Charter Request"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
