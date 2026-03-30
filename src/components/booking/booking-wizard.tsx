"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ChevronRight, ChevronLeft, Calendar, MapPin, Car, User } from "lucide-react";
import { StepDates } from "./step-dates";
import { StepVehicle } from "./step-vehicle";
import { StepDetails } from "./step-details";
import { StepConfirm } from "./step-confirm";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/types";
import { vehicles } from "@/lib/data";

const steps = [
  { id: 1, label: "Dates & Location", icon: Calendar },
  { id: 2, label: "Choose Vehicle", icon: Car },
  { id: 3, label: "Your Details", icon: User },
  { id: 4, label: "Confirm", icon: Check },
];

const emptyForm: BookingFormData = {
  pickupLocation: "",
  returnLocation: "",
  pickupDate: "",
  returnDate: "",
  pickupTime: "10:00",
  returnTime: "10:00",
  vehicleId: undefined,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  driverLicense: "",
  specialRequests: "",
};

function BookingWizardInner() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    ...emptyForm,
    vehicleId: searchParams.get("vehicle") || undefined,
    pickupLocation: searchParams.get("pickup") || "",
    pickupDate: searchParams.get("from") || "",
    returnDate: searchParams.get("to") || "",
  });

  // If vehicle pre-selected, start on dates step
  useEffect(() => {
    const vId = searchParams.get("vehicle");
    if (vId && vehicles.find((v) => v.id === vId)) {
      setFormData((prev) => ({ ...prev, vehicleId: vId }));
    }
  }, [searchParams]);

  function update(partial: Partial<BookingFormData>) {
    setFormData((prev) => ({ ...prev, ...partial }));
  }

  function next() {
    setCurrentStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prev() {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicleId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-5 left-0 right-0 h-px bg-white/10 -z-10" />
        {steps.map((step) => {
          const Icon = step.icon;
          const done = currentStep > step.id;
          const active = currentStep === step.id;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2 flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-10",
                  done
                    ? "bg-[#D4A017] border-[#D4A017] text-black"
                    : active
                    ? "bg-[#D4A017]/20 border-[#D4A017] text-[#D4A017]"
                    : "bg-[#111827] border-white/20 text-gray-600"
                )}
              >
                {done ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block text-center",
                  active ? "text-[#D4A017]" : done ? "text-gray-300" : "text-gray-600"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden">
        {currentStep === 1 && (
          <StepDates formData={formData} update={update} onNext={next} />
        )}
        {currentStep === 2 && (
          <StepVehicle formData={formData} update={update} onNext={next} onPrev={prev} />
        )}
        {currentStep === 3 && (
          <StepDetails formData={formData} update={update} onNext={next} onPrev={prev} />
        )}
        {currentStep === 4 && (
          <StepConfirm formData={formData} vehicle={selectedVehicle} onPrev={prev} />
        )}
      </div>

      {/* Summary bar (steps 2-4) */}
      {currentStep > 1 && formData.pickupDate && (
        <div className="mt-4 flex flex-wrap gap-3 items-center text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {formData.pickupLocation || "Location TBD"}
          </span>
          <span className="text-gray-700">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formData.pickupDate} → {formData.returnDate}
          </span>
          {selectedVehicle && (
            <>
              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1">
                <Car className="w-3 h-3" />
                {selectedVehicle.name}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function BookingWizard() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
      <BookingWizardInner />
    </Suspense>
  );
}

export { ChevronRight, ChevronLeft };
