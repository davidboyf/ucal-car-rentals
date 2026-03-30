import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { href: "/fleet", label: "Our Fleet" },
  { href: "/reservations", label: "Book a Vehicle" },
  { href: "/charter", label: "Luxury Charter" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Economy Rentals",
  "Compact Cars",
  "SUV Rentals",
  "Luxury Vehicles",
  "Van & Minibus",
  "Airport Transfers",
  "Corporate Charter",
  "Wedding Transport",
];

export function Footer() {
  return (
    <footer className="bg-[#060608] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4A017] flex items-center justify-center">
                <span className="text-black font-bold text-lg font-display">U</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">UCAL</div>
                <div className="text-[#D4A017] text-[10px] uppercase tracking-[0.2em]">Car Rentals</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Jamaica&apos;s trusted car rental and luxury charter service. Explore the island on your terms — from airport pickup to mountain roads.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D4A017]/20 hover:text-[#D4A017] text-gray-400 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D4A017]/20 hover:text-[#D4A017] text-gray-400 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D4A017]/20 hover:text-[#D4A017] text-gray-400 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4A017] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A017] mt-0.5 shrink-0" />
                <p className="text-gray-400 text-sm">
                  123 Harbour Street<br />Kingston, Jamaica
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4A017] shrink-0" />
                <a href="tel:+18761234567" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +1 (876) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4A017] shrink-0" />
                <a href="mailto:info@ucalrentacar.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@ucalrentacar.com
                </a>
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Office Hours</p>
                <p className="text-sm text-white">Mon–Fri: 7:00 AM – 8:00 PM</p>
                <p className="text-sm text-white">Sat–Sun: 8:00 AM – 6:00 PM</p>
                <p className="text-xs text-[#D4A017] mt-1">Airport pickup: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ucal Car Rentals & Charter Service. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
