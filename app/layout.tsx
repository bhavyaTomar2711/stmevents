import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers";
import ConditionalFooter from "./ConditionalFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STM Events",
  description: "Nightlife & Event Production",
  icons: {
    icon: [
      { url: "/logoo.png", type: "image/png" },
      { url: "/logoo.png", sizes: "32x32", type: "image/png" },
      { url: "/logoo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logoo.png",
    apple: "/logoo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <Providers>
          {children}
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
