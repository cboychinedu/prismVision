// Importing the necessary modules 
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Using the Ubuntu Font 
const poppins = Poppins({
  variable: "--primary-font",
  subsets: ["latin"],
  weight: ["400"]
})

// Exporting the meta data 
export const metadata: Metadata = {
  title: "Prism Vision",
  description: `A comprehensive platform combining Next.js, 
                Typescript, Python, FastAPI, and Ultralytics YOLO to perform advanced 
                instance segmentation algorithm and VLM-based visual reasoning. 
                Includes user authentication, historical logs with MongoDB, 
                and an interactive ML dashboard.`,
};

// Creating and exporting the Root Layout 
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
