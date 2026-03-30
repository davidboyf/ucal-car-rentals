"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A017]/50 transition-colors";

const subjects = [
  "General Inquiry",
  "New Reservation",
  "Modify/Cancel Booking",
  "Charter Service",
  "Billing & Payments",
  "Feedback",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(partial: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  const isValid = form.firstName && form.email && form.message;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#111827] border border-white/8 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#D4A017]/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-[#D4A017]" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Message Received!</h3>
        <p className="text-gray-400 text-sm">
          Thanks, {form.firstName}. We&apos;ll reply to{" "}
          <span className="text-[#D4A017]">{form.email}</span> within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111827] border border-white/8 rounded-2xl p-6 sm:p-8 space-y-5"
    >
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
          <label className="text-sm text-gray-400 mb-2 block">Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
            placeholder="Smith"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="+1 (876) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Subject</label>
        <select
          value={form.subject}
          onChange={(e) => update({ subject: e.target.value })}
          className={inputClass + " [color-scheme:dark]"}
        >
          {subjects.map((s) => (
            <option key={s} value={s} className="bg-[#111827]">{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Message *</label>
        <textarea
          value={form.message}
          onChange={(e) => update({ message: e.target.value })}
          placeholder="How can we help you?"
          rows={5}
          className={inputClass + " resize-none"}
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full flex items-center justify-center gap-2 py-4 bg-[#D4A017] hover:bg-[#F0C040] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
