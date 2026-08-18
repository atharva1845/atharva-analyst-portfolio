import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const title = "Atharva Rajoba | Business, Product & Data Analyst";
const description =
  "Portfolio of Atharva Rajoba, a Business Analyst with Product and Data Analytics experience across requirements, process improvement, SQL, Power BI, and applied AI.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: title,
    template: "%s | Atharva Rajoba",
  },
  description,
  authors: [{ name: "Atharva Rajoba" }],
  creator: "Atharva Rajoba",
  publisher: "Atharva Rajoba",
  category: "Portfolio",
  keywords: [
    "Atharva Rajoba",
    "Business Analyst",
    "Product Analyst",
    "Data Analyst",
    "Process Improvement",
    "Requirements Gathering",
    "Power BI",
    "SQL",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  openGraph: {
    title,
    description: "Turning business questions into clear, evidence-backed decisions.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Atharva Rajoba Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
