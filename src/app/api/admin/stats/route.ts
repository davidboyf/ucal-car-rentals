import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();

    const [bookingsRes, charterRes, contactRes, revenueRes] = await Promise.all([
      supabase.from("bookings").select("status", { count: "exact" }),
      supabase.from("charter_requests").select("status", { count: "exact" }),
      supabase.from("contact_messages").select("status", { count: "exact" }),
      supabase.from("bookings").select("total").eq("status", "confirmed"),
    ]);

    const bookings = bookingsRes.data ?? [];
    const charters = charterRes.data ?? [];
    const contacts = contactRes.data ?? [];
    const revenue = revenueRes.data ?? [];

    return NextResponse.json({
      bookings: {
        total: bookingsRes.count ?? bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        confirmed: bookings.filter((b) => b.status === "confirmed").length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
      },
      charters: {
        total: charterRes.count ?? charters.length,
        new: charters.filter((c) => c.status === "new").length,
        confirmed: charters.filter((c) => c.status === "confirmed").length,
      },
      contacts: {
        total: contactRes.count ?? contacts.length,
        unread: contacts.filter((m) => m.status === "unread").length,
      },
      revenue: {
        confirmed: revenue.reduce((sum, b) => sum + (b.total ?? 0), 0),
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/stats]", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
