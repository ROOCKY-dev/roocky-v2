import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MoodProvider } from "@/components/MoodProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Husam — roocky.dev",
  description:
    "The foundation you don't see until it's missing. CS student, builder, system architect.",
  metadataBase: new URL("https://roocky.dev"),
  openGraph: {
    title: "Ahmed Husam — roocky.dev",
    description:
      "The foundation you don't see until it's missing.",
    url: "https://roocky.dev",
    siteName: "roocky.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Husam — roocky.dev",
    description:
      "The foundation you don't see until it's missing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        <MoodProvider>
          {children}
        </MoodProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
