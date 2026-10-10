import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Ticker from "@/components/layout/Ticker";
import Footer from "@/components/layout/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর — প্রতিদিনের বাজারদর এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার প্রতিদিনের দাম — বাজারভিত্তিক বিস্তারিত এক জায়গায়।",
};

// All routes block on request-time data (live prices, sessions) —
// opt out of instant-navigation validation for the whole app.
export const instant = false;

async function NavSection() {
  // Never let an API outage break the shell of the app.
  const categories = await getCategories().catch(() => []);
  return <Navbar categories={categories} />;
}

async function TickerSection() {
  const products = await getProducts().catch(() => []);
  return <Ticker products={products} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn">
      <body className="antialiased">
        <div data-rht-toaster>
          <Toaster
            position="top-center"
            toastOptions={{
              style: { fontFamily: "inherit" },
              success: { iconTheme: { primary: "#15803d", secondary: "#fff" } },
            }}
          />
        </div>
        <Suspense fallback={<div className="h-28 bg-white/80" />}>
          <NavSection />
        </Suspense>
        <Suspense fallback={null}>
          <TickerSection />
        </Suspense>
        <main className="mx-auto max-w-6xl px-4 pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
