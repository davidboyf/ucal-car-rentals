import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendBookingConfirmation, sendAdminBookingAlert } from "@/lib/email";
import { vehicles as vehicleData } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      vehicleId,
      pickupLocation,
      returnLocation,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      firstName,
      lastName,
      email,
      phone,
      driverLicense,
      specialRequests,
    } = body;

    // Validate required fields
    if (!pickupLocation || !pickupDate || !returnDate || !firstName || !email || !phone || !driverLicense) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Calculate pricing
    const vehicle = vehicleData.find((v) => v.id === vehicleId);
    const days = Math.max(
      1,
      Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))
    );
    const subtotal = vehicle ? vehicle.pricePerDay * days : 0;
    const deposit = vehicle?.category === "luxury" ? 500 : 200;
    const total = subtotal + deposit;

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        vehicle_id: vehicleId || null,
        pickup_location: pickupLocation,
        return_location: returnLocation || pickupLocation,
        pickup_date: pickupDate,
        return_date: returnDate,
        pickup_time: pickupTime || "10:00",
        return_time: returnTime || "10:00",
        subtotal,
        deposit,
        total,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        driver_license: driverLicense,
        special_requests: specialRequests || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    // Send emails (non-blocking — don't fail the request if email fails)
    Promise.allSettled([
      sendBookingConfirmation({
        reference: data.reference,
        firstName,
        email,
        vehicleName: vehicle?.name ?? "Vehicle TBD",
        pickupLocation,
        pickupDate,
        returnDate,
        pickupTime: pickupTime || "10:00",
        returnTime: returnTime || "10:00",
        days,
        subtotal,
        deposit,
        total,
      }),
      sendAdminBookingAlert({
        reference: data.reference,
        firstName,
        lastName,
        email,
        phone,
        vehicleName: vehicle?.name ?? "Vehicle TBD",
        pickupLocation,
        pickupDate,
        returnDate,
        total,
      }),
    ]);

    return NextResponse.json({
      success: true,
      reference: data.reference,
      bookingId: data.id,
    });
  } catch (err) {
    console.error("[POST /api/bookings]", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin-only: fetch all bookings
  const authHeader = req.headers.get("x-admin-secret");
  if (authHeader !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") ?? "50");

    let query = supabase
      .from("bookings")
      .select("*, vehicles(name, category)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ bookings: data });
  } catch (err) {
    console.error("[GET /api/bookings]", err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
