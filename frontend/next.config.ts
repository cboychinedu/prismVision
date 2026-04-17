// Importing the necessary modules 
import type { NextConfig } from "next";

// Creating the next config object 
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: 'build',
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

// Exporting the next config 
export default nextConfig;


