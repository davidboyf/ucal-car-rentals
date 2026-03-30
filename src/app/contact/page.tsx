import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ucal Car Rentals. Call, email, or send a message. We're available 7 days a week to help with reservations and inquiries.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (876) 123-4567",
    href: "tel:+18761234567",
    note: "Available 7 days a week",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ucalrentacar.com",
    href: "mailto:info@ucalrentacar.com",
    note: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "123 Harbour Street, Kingston",
    href: "https://maps.google.com",
    note: "Jamaica",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 7AM – 8PM",
    href: null,
    note: "Sat–Sun: 8AM – 6PM • Airport: 24/7",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 bg-[#060608] border-b border-white/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            We&apos;re a team of real people who genuinely want to help. Reach out and we&apos;ll get back to you fast.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Contact info */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-white font-bold text-2xl mb-6">How to Reach Us</h2>
            {contactInfo.map(({ icon: Icon, label, value, href, note }) => (
              <div
                key={label}
                className="flex gap-4 p-5 bg-[#111827] border border-white/8 rounded-2xl"
              >
                <div className="w-11 h-11 rounded-xl bg-[#D4A017]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#D4A017]" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-white font-medium hover:text-[#D4A017] transition-colors text-sm"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-sm">{value}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-0.5">{note}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <div className="p-5 bg-[#D4A017]/8 border border-[#D4A017]/20 rounded-2xl">
              <p className="text-[#D4A017] font-semibold text-sm mb-1">Prefer WhatsApp?</p>
              <p className="text-gray-400 text-sm mb-3">
                Message us directly for the fastest response.
              </p>
              <a
                href="https://wa.me/18761234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold text-sm rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="lg:col-span-3">
            <h2 className="text-white font-bold text-2xl mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
