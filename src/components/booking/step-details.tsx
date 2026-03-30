"use client";

import { ChevronRight, ChevronLeft, User, Mail, Phone, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/types";

interface Props {
  formData: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

function Field({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ElementType;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={cn("text-sm text-gray-400 flex items-center gap-1.5 mb-2")}>
        {Icon && <Icon className="w-3.5 h-3.5 text-[#D4A017]" />}
        {label}
        {required && <span className="text-[#D4A017]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A017]/50 transition-colors";

export function StepDetails({ formData, update, onNext, onPrev }: Props) {
  const isValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.driverLicense;

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-white font-bold text-2xl mb-1">Your Details</h2>
      <p className="text-gray-400 text-sm mb-8">
        We need a few details to confirm your booking.
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" icon={User} required>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
              placeholder="John"
              className={inputClass}
            />
          </Field>
          <Field label="Last Name" required>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => update({ lastName: e.target.value })}
              placeholder="Smith"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email Address" icon={Mail} required>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="john@example.com"
              className={inputClass}
            />
          </Field>
          <Field label="Phone Number" icon={Phone} required>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="+1 (876) 000-0000"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Driver's License Number" icon={CreditCard} required>
          <input
            type="text"
            value={formData.driverLicense}
            onChange={(e) => update({ driverLicense: e.target.value })}
            placeholder="License number"
            className={inputClass}
          />
        </Field>

        <Field label="Special Requests (optional)">
          <textarea
            value={formData.specialRequests}
            onChange={(e) => update({ specialRequests: e.target.value })}
            placeholder="Child seat, GPS, specific instructions..."
            rows={3}
            className={cn(inputClass, "resize-none")}
          />
        </Field>

        <div className="p-4 bg-[#D4A017]/8 border border-[#D4A017]/20 rounded-xl">
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-[#D4A017] font-medium">Documents required at pickup:</span>{" "}
            Valid driver&apos;s license (2+ years), passport or national ID, and a credit/debit card
            for the security deposit.
          </p>
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
          onClick={onNext}
          disabled={!isValid}
          className="flex items-center gap-2 px-8 py-3 bg-[#D4A017] hover:bg-[#F0C040] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors"
        >
          Review Booking
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
