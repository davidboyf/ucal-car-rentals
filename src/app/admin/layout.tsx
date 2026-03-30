import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, CalendarCheck, Crown, MessageSquare, Car } from "lucide-react";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Ucal Admin" } };

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/charter", label: "Charter", icon: Crown },
  { href: "/admin/contact", label: "Messages", icon: MessageSquare },
  { href: "/admin/fleet", label: "Fleet", icon: Car },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060608] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/8 flex flex-col">
        <div className="p-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4A017] flex items-center justify-center">
              <span className="text-black font-bold text-sm">U</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">UCAL</div>
              <div className="text-[#D4A017] text-[9px] uppercase tracking-widest">Admin</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/8">
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Back to website
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
