"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  new:       "bg-blue-400/10 text-blue-400 border-blue-400/20",
  quoted:    "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  confirmed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
  completed: "bg-gray-400/10 text-gray-400 border-gray-400/20",
};

const SERVICE_LABELS: Record<string, string> = {
  "airport-transfer": "Airport",
  wedding: "Wedding",
  corporate: "Corporate",
  tour: "Tour",
  "special-event": "Special",
};

type CharterRequest = {
  id: string;
  reference: string;
  service_type: string;
  pickup_location: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  notes: string | null;
  status: string;
  quoted_price: number | null;
  created_at: string;
};

export function CharterTable({ requests: initial }: { requests: CharterRequest[] }) {
  const [requests, setRequests] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      await fetch(`/api/charter/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": "ucal-admin-2026",
        },
        body: JSON.stringify({ status }),
      });
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", "new", "quoted", "confirmed", "cancelled", "completed"].map((s) => (
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
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#111827] border border-white/8 rounded-2xl p-12 text-center text-gray-600">
          No charter requests yet.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/3 transition-colors"
                onClick={() => setExpanded(expanded === req.id ? null : req.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[#D4A017] text-xs">{req.reference}</span>
                  <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">
                    {SERVICE_LABELS[req.service_type] ?? req.service_type}
                  </span>
                  <span className="text-white text-sm">{req.first_name} {req.last_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">{req.date}</span>
                  <span className={cn("px-2 py-1 rounded-full text-xs border capitalize", STATUS_STYLES[req.status] ?? "")}>
                    {req.status}
                  </span>
                  <select
                    value={req.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                    disabled={updating === req.id}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none [color-scheme:dark] disabled:opacity-50"
                  >
                    {["new","quoted","confirmed","cancelled","completed"].map((s) => (
                      <option key={s} value={s} className="bg-[#111827]">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {expanded === req.id && (
                <div className="border-t border-white/8 p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div><p className="text-gray-500 text-xs mb-1">From</p><p className="text-gray-300">{req.pickup_location}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1">To</p><p className="text-gray-300">{req.destination}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1">Time</p><p className="text-gray-300">{req.time}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1">Passengers</p><p className="text-gray-300">{req.passengers}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1">Email</p><p className="text-gray-300">{req.email}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1">Phone</p><p className="text-gray-300">{req.phone}</p></div>
                  {req.notes && (
                    <div className="col-span-full"><p className="text-gray-500 text-xs mb-1">Notes</p><p className="text-gray-300">{req.notes}</p></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
