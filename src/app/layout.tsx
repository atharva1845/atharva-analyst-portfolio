import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharva Rajoba | Business, Product & Data Analyst",
  description:
    "Portfolio of Atharva Rajoba, a Business Analyst with Product and Data Analytics experience across requirements, process improvement, SQL, Power BI, and applied AI.",
  authors: [{ name: "Atharva Rajoba" }],
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
    title: "Atharva Rajoba | Business, Product & Data Analyst",
    description: "Turning business questions into clear, evidence-backed decisions.",
    type: "website",
    locale: "en_US",
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
