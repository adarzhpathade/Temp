import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RxGuard • Atelier Nº9 Clinical Prescription Journal",
  description:
    "Hand-drawn clinical prescription scanner & contraindication journal. Multi-modal OCR, drug-drug interaction matrix, and 24-hour auto-spacing timeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F4EEE2] text-[#33302B] font-karla antialiased selection:bg-[#A85A33]/25 selection:text-[#33302B]">
        {children}
      </body>
    </html>
  );
}
