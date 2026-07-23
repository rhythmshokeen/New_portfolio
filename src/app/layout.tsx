import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import FilmGrain from "@/components/FilmGrain/FilmGrain";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhythm Shokeen | Portfolio",
  description: "Research-Driven Software Engineering. Portfolio of Rhythm Shokeen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <FilmGrain />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
