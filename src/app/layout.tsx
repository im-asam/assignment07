import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর — প্রতিদিনের বাজারদর এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার প্রতিদিনের দাম — বাজারভিত্তিক বিস্তারিত এক জায়গায়।",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Never let an API outage break the shell of the app.
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);

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
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main className="mx-auto max-w-6xl px-4 pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
