import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "bookings@ucalrentacar.com";
const REPLY_TO = process.env.EMAIL_REPLY_TO ?? "info@ucalrentacar.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@ucalrentacar.com";

// ─── Booking confirmation to customer ────────────────────────
export async function sendBookingConfirmation(booking: {
  reference: string;
  firstName: string;
  email: string;
  vehicleName: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  days: number;
  subtotal: number;
  deposit: number;
  total: number;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("placeholder")) {
    console.log("[Email] Resend not configured — skipping booking confirmation email");
    return;
  }

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: booking.email,
    subject: `Booking Confirmed — ${booking.reference} | Ucal Car Rentals`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0F;color:#F9FAFB;">
        <div style="background:#D4A017;padding:24px 32px;">
          <h1 style="margin:0;font-size:24px;color:#000;font-family:Georgia,serif;">UCAL Car Rentals</h1>
          <p style="margin:4px 0 0;font-size:12px;color:#000;letter-spacing:2px;text-transform:uppercase;">Jamaica</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#D4A017;margin-top:0;">Booking Confirmed!</h2>
          <p>Hi ${booking.firstName},</p>
          <p>Your vehicle reservation has been received. Our team will contact you within 2 hours to finalize the booking.</p>

          <div style="background:#111827;border:1px solid #374151;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 4px;color:#9CA3AF;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Booking Reference</p>
            <p style="margin:0;font-size:22px;font-weight:bold;color:#D4A017;font-family:monospace;">${booking.reference}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Vehicle</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${booking.vehicleName}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Pickup</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${booking.pickupLocation}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Pickup Date</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${booking.pickupDate} at ${booking.pickupTime}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Return Date</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${booking.returnDate} at ${booking.returnTime}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Duration</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${booking.days} day${booking.days !== 1 ? "s" : ""}</td></tr>
            <tr style="border-top:1px solid #374151;">
              <td style="padding:12px 0 8px;color:#F9FAFB;font-weight:bold;">Total Due at Pickup</td>
              <td style="padding:12px 0 8px;color:#D4A017;font-weight:bold;font-size:18px;text-align:right;">$${booking.total.toFixed(2)}</td>
            </tr>
            <tr><td colspan="2" style="font-size:12px;color:#6B7280;">(includes $${booking.deposit.toFixed(2)} refundable deposit)</td></tr>
          </table>

          <div style="background:#1A1200;border:1px solid #D4A017;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;color:#D4A017;font-size:14px;font-weight:bold;">Documents Required at Pickup</p>
            <p style="margin:8px 0 0;color:#9CA3AF;font-size:13px;">Valid driver's licence (2+ years), passport or national ID, and a credit/debit card for the security deposit.</p>
          </div>

          <p style="color:#6B7280;font-size:13px;">Questions? Call us at <a href="tel:+18761234567" style="color:#D4A017;">+1 (876) 123-4567</a> or reply to this email.</p>
        </div>
        <div style="background:#060608;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#374151;font-size:12px;">© ${new Date().getFullYear()} Ucal Car Rentals & Charter Service, Kingston, Jamaica</p>
        </div>
      </div>
    `,
  });
}

// ─── New booking alert to admin ──────────────────────────────
export async function sendAdminBookingAlert(booking: {
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleName: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  total: number;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("placeholder")) return;

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Booking: ${booking.reference} — ${booking.firstName} ${booking.lastName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;">
        <h2 style="color:#D4A017;">New Booking Received</h2>
        <p><strong>Reference:</strong> ${booking.reference}</p>
        <p><strong>Customer:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Vehicle:</strong> ${booking.vehicleName}</p>
        <p><strong>Pickup:</strong> ${booking.pickupLocation}</p>
        <p><strong>Dates:</strong> ${booking.pickupDate} → ${booking.returnDate}</p>
        <p><strong>Total:</strong> $${booking.total.toFixed(2)}</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings" style="display:inline-block;background:#D4A017;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:16px;">View in Admin</a>
      </div>
    `,
  });
}

// ─── Charter request confirmation to customer ─────────────────
export async function sendCharterConfirmation(req: {
  reference: string;
  firstName: string;
  email: string;
  serviceType: string;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("placeholder")) {
    console.log("[Email] Resend not configured — skipping charter confirmation email");
    return;
  }

  const serviceLabels: Record<string, string> = {
    "airport-transfer": "Airport Transfer",
    wedding: "Wedding Transport",
    corporate: "Corporate Charter",
    tour: "Private Island Tour",
    "special-event": "Special Event",
  };

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: req.email,
    subject: `Charter Request Received — ${req.reference} | Ucal Car Rentals`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0F;color:#F9FAFB;">
        <div style="background:#D4A017;padding:24px 32px;">
          <h1 style="margin:0;font-size:24px;color:#000;font-family:Georgia,serif;">UCAL Car Rentals</h1>
          <p style="margin:4px 0 0;font-size:12px;color:#000;letter-spacing:2px;text-transform:uppercase;">Luxury Charter Service</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#D4A017;margin-top:0;">Charter Request Received</h2>
          <p>Hi ${req.firstName},</p>
          <p>We've received your charter request and will get back to you within 2 hours with availability and a quote.</p>

          <div style="background:#111827;border:1px solid #374151;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 4px;color:#9CA3AF;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Reference</p>
            <p style="margin:0;font-size:22px;font-weight:bold;color:#D4A017;font-family:monospace;">${req.reference}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Service</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${serviceLabels[req.serviceType] ?? req.serviceType}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">From</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${req.pickupLocation}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">To</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${req.destination}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Date & Time</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${req.date} at ${req.time}</td></tr>
            <tr><td style="padding:8px 0;color:#9CA3AF;font-size:14px;">Passengers</td><td style="padding:8px 0;color:#F9FAFB;font-size:14px;text-align:right;">${req.passengers}</td></tr>
          </table>

          <p style="color:#6B7280;font-size:13px;">Questions? Call us at <a href="tel:+18761234567" style="color:#D4A017;">+1 (876) 123-4567</a> or reply to this email.</p>
        </div>
        <div style="background:#060608;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#374151;font-size:12px;">© ${new Date().getFullYear()} Ucal Car Rentals & Charter Service, Kingston, Jamaica</p>
        </div>
      </div>
    `,
  });
}

// ─── Contact message confirmation ────────────────────────────
export async function sendContactConfirmation(msg: {
  firstName: string;
  email: string;
  subject: string;
}) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("placeholder")) return;

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: msg.email,
    subject: `We got your message — Ucal Car Rentals`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;">
        <h2 style="color:#D4A017;">Message Received</h2>
        <p>Hi ${msg.firstName},</p>
        <p>Thanks for reaching out about "<strong>${msg.subject}</strong>". We'll reply within 2 hours.</p>
        <p style="color:#6B7280;font-size:13px;">— Ucal Car Rentals Team</p>
      </div>
    `,
  });
}
