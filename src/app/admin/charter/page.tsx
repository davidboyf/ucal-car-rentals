import type { Metadata } from "next";
import { CharterTable } from "@/components/admin/charter-table";

export const metadata: Metadata = { title: "Charter Requests" };

async function getCharters() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/charter`, {
      headers: { "x-admin-secret": process.env.ADMIN_SECRET ?? "" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.requests ?? [];
  } catch {
    return [];
  }
}

export default async function CharterAdminPage() {
  const requests = await getCharters();
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl">Charter Requests</h1>
        <p className="text-gray-500 text-sm mt-1">{requests.length} total</p>
      </div>
      <CharterTable requests={requests} />
    </div>
  );
}
