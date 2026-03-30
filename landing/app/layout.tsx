import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Outreach AI — AI-Powered PR & Media Outreach",
  description:
    "Streamline creator partnerships, automate payouts, and scale your influencer campaigns — all in one platform.",
  openGraph: {
    title: "Outreach AI — AI-Powered PR & Media Outreach",
    description:
      "Streamline creator partnerships, automate payouts, and scale your influencer campaigns — all in one platform.",
    type: "website",
    siteName: "Outreach AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outreach AI — AI-Powered PR & Media Outreach",
    description:
      "Streamline creator partnerships, automate payouts, and scale your influencer campaigns.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050A1F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
