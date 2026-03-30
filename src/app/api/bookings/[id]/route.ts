import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

function adminOnly(req: NextRequest) {
  return req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (adminOnly(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const supabase = createServerClient();
  const { data, error } = await supabase.from("bookings").select("*, vehicles(*)").eq("id", id).single();
  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking: data });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (adminOnly(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .update({ status: body.status, notes: body.notes })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });
  return NextResponse.json({ booking: data });
}
