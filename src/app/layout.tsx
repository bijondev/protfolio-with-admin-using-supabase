import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bijon Krishna Bairagi | Creative Web Developer",
  description:
    "Crafting engaging and user-friendly websites & applications. Explore Bijon's portfolio to see his expertise in web and mobile development.",
  keywords: [
    "web developer",
    "portfolio",
    "react developer",
    "next.js",
    "full stack developer",
  ],
  openGraph: {
    title: "Bijon Krishna Bairagi | Creative Web Developer",
    description:
      "Crafting engaging and user-friendly websites & applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
        {children}
      </body>
    </html>
  );
}
