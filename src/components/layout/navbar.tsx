"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  {
    label: "Reservations",
    href: "/reservations",
    children: [
      { href: "/reservations", label: "Book a Vehicle" },
      { href: "/reservations/modify", label: "Modify Reservation" },
    ],
  },
  { href: "/charter", label: "Luxury Charter" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservationsOpen, setReservationsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#D4A017] flex items-center justify-center">
              <span className="text-black font-bold text-lg font-display">U</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight tracking-tight">
                UCAL
              </span>
              <span className="text-[#D4A017] text-[10px] uppercase tracking-[0.2em] leading-tight">
                Car Rentals
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setReservationsOpen(true)}
                    onMouseLeave={() => setReservationsOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname.startsWith("/reservations")
                          ? "text-[#D4A017]"
                          : "text-gray-300 hover:text-white"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform",
                          reservationsOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {reservationsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-[#111827] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#D4A017]"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+18761234567"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              +1 (876) 123-4567
            </a>
            <Link
              href="/reservations"
              className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm rounded-xl transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0A0A0F]/98 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label}>
                    <div className="px-4 py-2 text-xs uppercase tracking-widest text-gray-500">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-8 py-2.5 text-sm text-gray-300 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium",
                    pathname === link.href
                      ? "text-[#D4A017] bg-[#D4A017]/10"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/reservations"
                className="block w-full text-center px-5 py-3 bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm rounded-xl transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
