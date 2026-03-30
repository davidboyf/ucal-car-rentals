"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  confirmed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
  completed: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  no_show:   "bg-gray-400/10 text-gray-400 border-gray-400/20",
};

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed", "no_show"];

type Booking = {
  id: string;
  reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pickup_location: string;
  pickup_date: string;
  return_date: string;
  days: number;
  total: number;
  status: string;
  created_at: string;
  vehicles?: { name: string; category: string } | null;
};

export function BookingsTable({ bookings: initial }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "ucal-admin-2026",
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
              filter === s
                ? "bg-[#D4A017] text-black"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            )}
          >
            {s.replace("_", " ")}
            {s !== "all" && (
              <span className="ml-1.5 opacity-60">
                ({bookings.filter((b) => b.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-[#111827] border border-white/8 rounded-2xl p-12 text-center text-gray-600">
          No bookings yet. They&apos;ll appear here once customers start booking.
        </div>
      ) : (
        <div className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {["Reference", "Customer", "Vehicle", "Dates", "Total", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gray-500 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-[#D4A017] text-xs">{booking.reference}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white text-xs font-medium">{booking.first_name} {booking.last_name}</div>
                      <div className="text-gray-600 text-xs">{booking.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-300 text-xs">{booking.vehicles?.name ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-gray-300 text-xs">{booking.pickup_date} →</div>
                      <div className="text-gray-300 text-xs">{booking.return_date}</div>
                      <div className="text-gray-600 text-xs">{booking.days}d</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white font-semibold text-xs">
                        ${booking.total?.toFixed(2) ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2 py-1 rounded-full text-xs border capitalize", STATUS_STYLES[booking.status] ?? "")}>
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        disabled={updating === booking.id}
                        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-[#D4A017]/50 [color-scheme:dark] disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-[#111827] capitalize">
                            {s.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
