import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRMS",
  description: "Created By Hamza Tanweer using next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} backdrop-blur-md bg-black rounded-3xl max-w-[1920px] h-screen`}>{children}</body>
    </html>
  );
}
