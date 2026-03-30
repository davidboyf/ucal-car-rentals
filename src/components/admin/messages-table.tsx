"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  unread:   "bg-blue-400/10 text-blue-400 border-blue-400/20",
  read:     "bg-gray-400/10 text-gray-400 border-gray-400/20",
  replied:  "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  archived: "bg-white/5 text-gray-600 border-white/10",
};

type Message = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

export function MessagesTable({ messages: initial }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? messages : messages.filter((m) => m.status === filter);

  async function markStatus(id: string, status: string) {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": "ucal-admin-2026",
        },
        body: JSON.stringify({ status }),
      });
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
    } catch { /* silent */ }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", "unread", "read", "replied", "archived"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
              filter === s
                ? "bg-[#D4A017] text-black"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            )}
          >
            {s}
            {s === "unread" && (
              <span className="ml-1.5 opacity-60">({messages.filter((m) => m.status === "unread").length})</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#111827] border border-white/8 rounded-2xl p-12 text-center text-gray-600">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "bg-[#111827] border rounded-2xl overflow-hidden transition-colors",
                msg.status === "unread" ? "border-[#D4A017]/20" : "border-white/8"
              )}
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/3"
                onClick={() => {
                  setExpanded(expanded === msg.id ? null : msg.id);
                  if (msg.status === "unread") markStatus(msg.id, "read");
                }}
              >
                <div className="flex items-center gap-3">
                  {msg.status === "unread" && (
                    <div className="w-2 h-2 rounded-full bg-[#D4A017] shrink-0" />
                  )}
                  <div>
                    <span className="text-white text-sm font-medium">{msg.first_name} {msg.last_name}</span>
                    <span className="text-gray-500 text-xs ml-2">{msg.email}</span>
                  </div>
                  <span className="text-gray-400 text-sm hidden sm:block">— {msg.subject}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-xs hidden sm:block">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs border capitalize", STATUS_STYLES[msg.status] ?? "")}>
                    {msg.status}
                  </span>
                </div>
              </div>

              {expanded === msg.id && (
                <div className="border-t border-white/8 p-4 space-y-3">
                  <p className="text-gray-300 text-sm leading-relaxed">{msg.message}</p>
                  {msg.phone && <p className="text-gray-500 text-xs">Phone: {msg.phone}</p>}
                  <div className="flex gap-2 pt-2">
                    {["read", "replied", "archived"].map((s) => (
                      <button
                        key={s}
                        onClick={() => markStatus(msg.id, s)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border",
                          msg.status === s
                            ? "bg-[#D4A017] text-black border-[#D4A017]"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#D4A017] hover:bg-[#D4A017]/20 transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
