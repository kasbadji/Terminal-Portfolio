import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terminal Portfolio - Kasbadji Mohamed Halim",
  description: "Interactive terminal-style portfolio showcasing projects and skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}
