import type { Metadata } from "next";
import { FleetManager } from "@/components/admin/fleet-manager";
import { vehicles } from "@/lib/data";

export const metadata: Metadata = { title: "Fleet Management" };

export default function FleetAdminPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl">Fleet Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Toggle availability and update pricing. Changes save to Supabase when connected.
        </p>
      </div>
      <FleetManager vehicles={vehicles} />
    </div>
  );
}
