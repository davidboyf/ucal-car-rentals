// Auto-generate this file later with:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/types.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string;
          name: string;
          category: "economy" | "compact" | "suv" | "luxury" | "van" | "pickup";
          image_url: string | null;
          price_per_day: number;
          seats: number;
          luggage: number;
          transmission: "automatic" | "manual";
          fuel_type: "gasoline" | "diesel" | "hybrid" | "electric";
          ac: boolean;
          features: string[];
          available: boolean;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["vehicles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Insert"]>;
      };
      vehicle_blocked_dates: {
        Row: {
          id: string;
          vehicle_id: string;
          blocked_from: string;
          blocked_to: string;
          reason: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["vehicle_blocked_dates"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["vehicle_blocked_dates"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          reference: string;
          vehicle_id: string | null;
          pickup_location: string;
          return_location: string;
          pickup_date: string;
          return_date: string;
          pickup_time: string;
          return_time: string;
          days: number;
          subtotal: number | null;
          deposit: number | null;
          total: number | null;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          driver_license: string;
          special_requests: string | null;
          status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "reference" | "days" | "created_at" | "updated_at">;
        Update: Partial<Pick<Database["public"]["Tables"]["bookings"]["Row"], "status" | "notes" | "subtotal" | "deposit" | "total">>;
      };
      charter_requests: {
        Row: {
          id: string;
          reference: string;
          service_type: "airport-transfer" | "wedding" | "corporate" | "tour" | "special-event";
          pickup_location: string;
          destination: string;
          date: string;
          time: string;
          passengers: number;
          vehicle_preference: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          notes: string | null;
          status: "new" | "quoted" | "confirmed" | "cancelled" | "completed";
          quoted_price: number | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["charter_requests"]["Row"], "id" | "reference" | "created_at" | "updated_at">;
        Update: Partial<Pick<Database["public"]["Tables"]["charter_requests"]["Row"], "status" | "quoted_price" | "admin_notes">>;
      };
      contact_messages: {
        Row: {
          id: string;
          first_name: string;
          last_name: string | null;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: "unread" | "read" | "replied" | "archived";
          admin_reply: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["contact_messages"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Pick<Database["public"]["Tables"]["contact_messages"]["Row"], "status" | "admin_reply">>;
      };
    };
  };
}
