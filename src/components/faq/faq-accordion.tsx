"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const allCategories = ["All", ...categories];
  const filtered = activeCategory === "All" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-[#D4A017] text-black"
                : "bg-[#111827] border border-white/10 text-gray-400 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filtered.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={cn(
                "bg-[#111827] border rounded-2xl overflow-hidden transition-colors",
                isOpen ? "border-[#D4A017]/30" : "border-white/8"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className={cn("font-medium text-sm sm:text-base", isOpen ? "text-white" : "text-gray-300")}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform text-[#D4A017]",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="border-t border-white/8 pt-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mt-14 text-center p-8 bg-[#111827] border border-white/8 rounded-2xl">
        <h3 className="text-white font-semibold text-xl mb-2">Still have questions?</h3>
        <p className="text-gray-400 text-sm mb-6">
          Our team is available 7 days a week. We&apos;re happy to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+18761234567"
            className="px-6 py-3 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold rounded-xl transition-colors text-sm"
          >
            Call Us Now
          </a>
          <a
            href="mailto:info@ucalrentacar.com"
            className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-400 hover:text-white font-medium rounded-xl transition-colors text-sm"
          >
            Send an Email
          </a>
        </div>
      </div>
    </div>
  );
}
