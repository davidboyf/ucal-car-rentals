import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendContactConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        first_name: firstName,
        last_name: lastName || null,
        email,
        phone: phone || null,
        subject: subject || "General Inquiry",
        message,
        status: "unread",
      })
      .select()
      .single();

    if (error) throw error;

    Promise.allSettled([
      sendContactConfirmation({ firstName, email, subject: subject || "General Inquiry" }),
    ]);

    return NextResponse.json({ success: true, messageId: data.id });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
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
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ messages: data });
  } catch (err) {
    console.error("[GET /api/contact]", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
