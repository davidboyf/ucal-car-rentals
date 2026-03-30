"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, Pencil } from "lucide-react";
import type { Vehicle } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";

export function FleetManager({ vehicles: initial }: { vehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [saving, setSaving] = useState<string | null>(null);

  async function toggleAvailable(id: string, available: boolean) {
    setSaving(id);
    try {
      await fetch("/api/vehicles", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": "ucal-admin-2026",
        },
        body: JSON.stringify({ id, available }),
      });
      setVehicles((prev) => prev.map((v) => v.id === id ? { ...v, available } : v));
    } finally {
      setSaving(null);
    }
  }

  async function savePrice(id: string) {
    setSaving(id);
    try {
      await fetch("/api/vehicles", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": "ucal-admin-2026",
        },
        body: JSON.stringify({ id, price_per_day: editPrice }),
      });
      setVehicles((prev) => prev.map((v) => v.id === id ? { ...v, pricePerDay: editPrice } : v));
      setEditingId(null);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className={cn(
            "bg-[#111827] border rounded-2xl overflow-hidden",
            vehicle.available ? "border-white/8" : "border-red-500/20 opacity-70"
          )}
        >
          <div className="relative h-36 overflow-hidden">
            <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border",
                vehicle.available
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              )}>
                {vehicle.available ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold text-sm">{vehicle.name}</h3>
                <p className="text-gray-500 text-xs capitalize">{vehicle.category}</p>
              </div>
            </div>

            {/* Price editing */}
            <div className="flex items-center gap-2">
              {editingId === vehicle.id ? (
                <>
                  <span className="text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-20 bg-white/5 border border-[#D4A017]/50 rounded-lg px-2 py-1 text-white text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => savePrice(vehicle.id)}
                    disabled={saving === vehicle.id}
                    className="p-1.5 bg-[#D4A017]/20 hover:bg-[#D4A017]/30 text-[#D4A017] rounded-lg transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-[#D4A017] font-bold">{formatCurrency(vehicle.pricePerDay)}/day</span>
                  <button
                    onClick={() => { setEditingId(vehicle.id); setEditPrice(vehicle.pricePerDay); }}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-300 rounded-lg transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>

            {/* Toggle availability */}
            <button
              onClick={() => toggleAvailable(vehicle.id, !vehicle.available)}
              disabled={saving === vehicle.id}
              className={cn(
                "w-full py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50",
                vehicle.available
                  ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                  : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
              )}
            >
              {vehicle.available ? "Mark Unavailable" : "Mark Available"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
