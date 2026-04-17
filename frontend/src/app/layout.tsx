import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ubuntu Font 
const poppins = Poppins({
  variable: "--primary-font",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "Prism Vision",
  description: `A comprehensive platform combining Next.js, 
                Typescript, Python, FastAPI, and Ultralytics YOLO to perform advanced 
                instance segmentation algorithm and VLM-based visual reasoning. 
                Includes user authentication, historical logs with MongoDB, 
                and an interactive ML dashboard.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
