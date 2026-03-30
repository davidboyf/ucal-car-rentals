import { NextRequest, NextResponse } from "next/server";
import { createServerClient, createPublicServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("price_per_day", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ vehicles: data });
  } catch (err) {
    console.error("[GET /api/vehicles]", err);
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("vehicles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ vehicle: data });
  } catch (err) {
    console.error("[PATCH /api/vehicles]", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
