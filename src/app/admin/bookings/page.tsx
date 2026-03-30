import type { Metadata } from "next";
import { BookingsTable } from "@/components/admin/bookings-table";

export const metadata: Metadata = { title: "Bookings" };

async function getBookings(status?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
    const url = new URL(`${baseUrl}/api/bookings`);
    if (status) url.searchParams.set("status", status);
    url.searchParams.set("limit", "100");
    const res = await fetch(url.toString(), {
      headers: { "x-admin-secret": process.env.ADMIN_SECRET ?? "" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.bookings ?? [];
  } catch {
    return [];
  }
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const bookings = await getBookings(status);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">{bookings.length} result{bookings.length !== 1 ? "s" : ""}</p>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
