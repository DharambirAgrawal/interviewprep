import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DefaultLayout from "./DefaultLayout";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { baseMetadata, defaultViewport } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
