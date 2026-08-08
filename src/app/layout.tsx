import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col relative selection:bg-[var(--color-accent-orange)] selection:text-white">
        <Providers>
          {/* Noise overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] bg-[url('/noise.png')]"></div>
          
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

