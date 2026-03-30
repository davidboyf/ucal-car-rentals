import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Ucal Car Rentals | Premium Vehicle Rentals & Charter — Jamaica",
    template: "%s | Ucal Car Rentals Jamaica",
  },
  description:
    "Explore Jamaica on your terms. Premium car rentals, luxury charter services, and airport transfers across Kingston, Montego Bay, and the entire island.",
  keywords: [
    "car rental Jamaica",
    "car hire Jamaica",
    "Kingston car rental",
    "Montego Bay car rental",
    "luxury charter Jamaica",
    "airport transfer Jamaica",
    "vehicle rental Jamaica",
  ],
  openGraph: {
    title: "Ucal Car Rentals | Premium Vehicle Rentals & Charter — Jamaica",
    description:
      "Premium car rentals and luxury charter services across Jamaica. Book in minutes.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
