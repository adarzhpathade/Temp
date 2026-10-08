import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RxGuard • Clinical Pharmacovigilance & Polypharmacy Scanner",
  description:
    "Multi-modal prescription OCR scanner, drug-drug contraindication matrix, and interactive 24-hour auto-spacing timeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F5] text-[#2B2723] font-sans-clinical antialiased selection:bg-[#A85A33]/20 selection:text-[#2B2723]">
        {children}
      </body>
    </html>
  );
}
