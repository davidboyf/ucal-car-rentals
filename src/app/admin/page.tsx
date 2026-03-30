import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Crown, MessageSquare, DollarSign, TrendingUp, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

// Server component — fetches stats directly
async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { "x-admin-secret": process.env.ADMIN_SECRET ?? "" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Bookings",
      value: stats?.bookings?.total ?? "—",
      sub: `${stats?.bookings?.pending ?? 0} pending`,
      icon: CalendarCheck,
      href: "/admin/bookings",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Charter Requests",
      value: stats?.charters?.total ?? "—",
      sub: `${stats?.charters?.new ?? 0} new`,
      icon: Crown,
      href: "/admin/charter",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Messages",
      value: stats?.contacts?.total ?? "—",
      sub: `${stats?.contacts?.unread ?? 0} unread`,
      icon: MessageSquare,
      href: "/admin/contact",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Confirmed Revenue",
      value: stats?.revenue?.confirmed != null
        ? `$${Number(stats.revenue.confirmed).toLocaleString()}`
        : "—",
      sub: "confirmed bookings only",
      icon: DollarSign,
      href: "/admin/bookings?status=confirmed",
      color: "text-[#D4A017]",
      bg: "bg-[#D4A017]/10",
    },
  ];

  const quickLinks = [
    { href: "/admin/bookings", label: "View All Bookings", icon: CalendarCheck },
    { href: "/admin/charter", label: "Charter Requests", icon: Crown },
    { href: "/admin/contact", label: "Contact Messages", icon: MessageSquare },
    { href: "/admin/fleet", label: "Manage Fleet", icon: TrendingUp },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white font-bold text-2xl">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, sub, icon: Icon, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="bg-[#111827] border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
            <div className="text-white text-sm font-medium">{label}</div>
            <div className="text-gray-600 text-xs mt-0.5">{sub}</div>
          </Link>
        ))}
      </div>

      {/* No Supabase notice */}
      {!stats && (
        <div className="mb-8 p-4 bg-[#D4A017]/8 border border-[#D4A017]/20 rounded-2xl flex items-start gap-3">
          <Clock className="w-5 h-5 text-[#D4A017] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#D4A017] font-semibold text-sm">Supabase not connected yet</p>
            <p className="text-gray-400 text-xs mt-0.5">
              Stats and data will appear here once you add your Supabase credentials to <code className="text-gray-300">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="bg-[#111827] border border-white/8 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/8 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
            >
              <Icon className="w-4 h-4 text-[#D4A017]" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
