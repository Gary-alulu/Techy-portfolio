import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ClientWidgets from "@/components/layout/ClientWidgets";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gary-alulu-portfolio.vercel.app"),
  title: {
    template: "%s | Gary Alulu",
    default: "Gary Alulu | Premium Digital Design Studio",
  },
  description: "Crafting Brands. Designing Experiences. Building Products.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Gary Alulu Studio",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" />
      </head>
      <body className="min-h-screen flex flex-col relative selection:bg-[var(--color-accent-orange)] selection:text-white">
        <Providers>
          <LoadingScreen />
          <ClientWidgets />
          <Navigation />
          <main className="flex-grow pt-[144px] px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
