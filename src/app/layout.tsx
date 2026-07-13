import type { Metadata } from "next";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { DemoModeBanner } from "@/components/layout/demo-mode-banner";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchOverlay } from "@/components/search/search-overlay";
import { storeConfig } from "@/data/store-config";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: "Office, Home-Office & Upholstered Furniture | Brightdesk Supplies LLC",
    template: "%s | Brightdesk Supplies LLC",
  },
  description:
    "Browse desks, seating, storage, meeting furniture and upholstered furniture organized around focus, collaboration, organization and comfort.",
  openGraph: {
    title: "Brightdesk Supplies LLC",
    description: "Furniture for the way work and life overlap.",
    images: ["/og-brand.png"],
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gallery-white focus:px-4 focus:py-2 focus:text-blueprint-ink"
        >
          Skip to main content
        </a>
        <DemoModeBanner />
        <AnnouncementBar />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <CartDrawer />
        <SearchOverlay />
      </body>
    </html>
  );
}
