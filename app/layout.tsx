import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Asikur Rahman - Software Engineer",
  description: "Personal portfolio website of Asikur Rahman, Software Engineer",
  generator: "Asikur Rahman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.className} bg-gray-900 text-slate-300`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
