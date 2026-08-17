import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharva Rajoba | Data Analyst Portfolio",
  description:
    "Recruiter-focused data analyst portfolio for Atharva Rajoba, featuring analytics projects, business insights, machine learning research, and case-study storytelling.",
  authors: [{ name: "Atharva Rajoba" }],
  keywords: [
    "Atharva Rajoba",
    "Data Analyst",
    "Business Analyst",
    "Power BI",
    "SQL",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  openGraph: {
    title: "Atharva Rajoba | Data Analyst Portfolio",
    description: "Turning Data into Business Decisions",
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
