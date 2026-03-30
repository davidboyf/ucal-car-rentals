import type { Metadata } from "next";
import { MessagesTable } from "@/components/admin/messages-table";

export const metadata: Metadata = { title: "Contact Messages" };

async function getMessages() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/contact`, {
      headers: { "x-admin-secret": process.env.ADMIN_SECRET ?? "" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.messages ?? [];
  } catch {
    return [];
  }
}

export default async function ContactAdminPage() {
  const messages = await getMessages();
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-white font-bold text-2xl">Contact Messages</h1>
        <p className="text-gray-500 text-sm mt-1">{messages.filter((m: { status: string }) => m.status === "unread").length} unread</p>
      </div>
      <MessagesTable messages={messages} />
    </div>
  );
}
