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

export const metadata: Metadata = {
  title: `${site.brand} by ${site.name} | Coral beads & traditional attire, Benin City`,
  description: site.description,
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
