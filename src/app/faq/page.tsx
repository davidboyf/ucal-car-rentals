import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about renting a car or booking a charter with Ucal in Jamaica. Reservations, requirements, payment, insurance, and more.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="relative py-20 bg-[#060608] border-b border-white/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Help Center</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Everything you need to know about renting with Ucal. Can&apos;t find your answer?{" "}
            <Link href="/contact" className="text-[#D4A017] hover:underline">
              Contact us directly.
            </Link>
          </p>
        </div>
      </div>

      <FAQAccordion />
    </div>
  );
}
