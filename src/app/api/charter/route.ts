import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendCharterConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      serviceType,
      pickupLocation,
      destination,
      date,
      time,
      passengers,
      vehiclePreference,
      firstName,
      lastName,
      email,
      phone,
      notes,
    } = body;

    if (!pickupLocation || !destination || !date || !firstName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("charter_requests")
      .insert({
        service_type: serviceType ?? "airport-transfer",
        pickup_location: pickupLocation,
        destination,
        date,
        time: time ?? "10:00",
        passengers: passengers ?? 1,
        vehicle_preference: vehiclePreference || null,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        notes: notes || null,
        status: "new",
      })
      .select()
      .single();

    if (error) throw error;

    Promise.allSettled([
      sendCharterConfirmation({
        reference: data.reference,
        firstName,
        email,
        serviceType: serviceType ?? "airport-transfer",
        pickupLocation,
        destination,
        date,
        time: time ?? "10:00",
        passengers: passengers ?? 1,
      }),
    ]);

    return NextResponse.json({
      success: true,
      reference: data.reference,
      requestId: data.id,
    });
  } catch (err) {
    console.error("[POST /api/charter]", err);
    return NextResponse.json({ error: "Failed to submit charter request" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("charter_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ requests: data });
  } catch (err) {
    console.error("[GET /api/charter]", err);
    return NextResponse.json({ error: "Failed to fetch charter requests" }, { status: 500 });
  }
}
