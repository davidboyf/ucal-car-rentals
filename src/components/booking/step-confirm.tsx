"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Calendar, Car, User, ChevronLeft,
  CheckCircle, Loader2
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { BookingFormData, Vehicle } from "@/types";

interface Props {
  formData: BookingFormData;
  vehicle: Vehicle | undefined;
  onPrev: () => void;
}

export function StepConfirm({ formData, vehicle, onPrev }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const days = formData.pickupDate && formData.returnDate
    ? Math.max(
        1,
        Math.ceil(
          (new Date(formData.returnDate).getTime() - new Date(formData.pickupDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 1;

  const subtotal = vehicle ? vehicle.pricePerDay * days : 0;
  const deposit = vehicle ? (vehicle.category === "luxury" ? 500 : 200) : 200;

  async function handleSubmit() {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-[#D4A017]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#D4A017]" />
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-3">
          Reservation Confirmed!
        </h2>
        <p className="text-gray-400 mb-2">
          Thank you, {formData.firstName}. Your booking has been received.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          A confirmation email has been sent to{" "}
          <span className="text-[#D4A017]">{formData.email}</span>.
          Our team will be in touch within 2 hours to finalize your booking.
        </p>
        <div className="p-4 bg-white/5 rounded-xl text-sm text-gray-400 mb-8">
          <p>Booking Reference: <span className="text-white font-mono">UCL-{Date.now().toString().slice(-6)}</span></p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-white/20 hover:border-white/40 text-gray-400 hover:text-white font-medium rounded-xl transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-white font-bold text-2xl mb-1">Review & Confirm</h2>
      <p className="text-gray-400 text-sm mb-8">Please review your booking details before confirming.</p>

      <div className="space-y-5">
        {/* Vehicle */}
        {vehicle && (
          <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
            <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
              <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="96px" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#D4A017]" />
                <span className="text-white font-semibold">{vehicle.name}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1 capitalize">{vehicle.category} class</p>
              <p className="text-[#D4A017] text-sm mt-1">{formatCurrency(vehicle.pricePerDay)}/day</p>
            </div>
          </div>
        )}

        {/* Booking info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#D4A017] text-sm font-medium mb-3">
              <MapPin className="w-4 h-4" /> Location
            </div>
            <p className="text-gray-300 text-sm">{formData.pickupLocation}</p>
            {formData.returnLocation && formData.returnLocation !== formData.pickupLocation && (
              <p className="text-gray-500 text-xs">Return: {formData.returnLocation}</p>
            )}
          </div>
          <div className="p-4 bg-white/5 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#D4A017] text-sm font-medium mb-3">
              <Calendar className="w-4 h-4" /> Dates
            </div>
            <p className="text-gray-300 text-sm">
              {formData.pickupDate} at {formData.pickupTime}
            </p>
            <p className="text-gray-500 text-xs">
              Return: {formData.returnDate} at {formData.returnTime}
            </p>
            <p className="text-[#D4A017] text-xs">{days} day{days !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-[#D4A017] text-sm font-medium mb-3">
            <User className="w-4 h-4" /> Driver Details
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Name</p>
              <p className="text-gray-300">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Email</p>
              <p className="text-gray-300">{formData.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Phone</p>
              <p className="text-gray-300">{formData.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">License</p>
              <p className="text-gray-300">{formData.driverLicense}</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-4 bg-[#D4A017]/8 border border-[#D4A017]/20 rounded-xl">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>{formatCurrency(vehicle?.pricePerDay ?? 0)} × {days} days</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Security deposit (refundable)</span>
              <span>{formatCurrency(deposit)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
              <span>Total due at pickup</span>
              <span className="text-[#D4A017]">{formatCurrency(subtotal + deposit)}</span>
            </div>
          </div>
        </div>
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
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-[#D4A017] hover:bg-[#F0C040] disabled:opacity-60 text-black font-bold rounded-xl transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm Reservation"
          )}
        </button>
      </div>
    </div>
  );
}
