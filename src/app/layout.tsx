import type { Metadata, Viewport } from "next";
import { Fraunces, Gloock, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ChatWidget } from "@/components/ui/ChatWidget";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const title = `${site.brand} by ${site.name} | Coral beads & traditional attire, Benin City`;

/**
 * Site-wide metadata. The share image is src/app/opengraph-image.tsx, which Next adds to every
 * page as og:image and twitter:image; pages override the title and description only.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://royal-beads-edo.vercel.app"),
  title,
  description: site.description,
  openGraph: {
    type: "website",
    siteName: `${site.brand} by ${site.name}`,
    locale: "en_NG",
    url: "/",
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1411",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${gloock.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
