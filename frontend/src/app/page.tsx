"use client";

// Importing the necessary modules 
import React, { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from "@/images/home/prism-vision-logo.png";
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

// Creating the home component 
const Home = () => {
  // Rendering the home compnent 
  return (
    <Fragment>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Head>
          <title>Prism Vision | Multimodal Intelligence</title>
        </Head>

        {/* Sticky Navigation Bar */}
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Link href="/">
              <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <Image src={logoImage} height={45} width={45} className="h-11.25 w-11.25 rounded-full" alt="imageLogo" />
              </div>
            </Link>
            <div className="hidden md:flex space-x-8 font-medium">
              <a href="#about" className="hover:text-blue-600 transition">About</a>
              <a href="#workflow" className="hover:text-blue-600 transition">Workflow</a>
              <a href="#features" className="hover:text-blue-600 transition">Features</a>
            </div>
            <div className="flex space-x-4">
              <button className="px-5 py-2 text-blue-600 font-semibold">Login</button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 text-center px-4">
            <Fade cascade>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                See Beyond the <span className="text-blue-400">Pixel.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Experience the next frontier of Computer Vision. Integrating Multimodal VLMs
                with precise Instance Segmentation to provide semantic context for every shape.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-blue-600 rounded-lg text-lg font-bold hover:scale-105 transition-transform">
                  Launch Dashboard
                </button>
                <button className="px-8 py-4 border border-slate-500 rounded-lg text-lg font-bold hover:bg-white/10 transition">
                  View Documentation
                </button>
              </div>
            </Fade>
          </div>
        </header>

        {/* Detailed Working Principle Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <Fade cascade direction='left'>
              <h2 className="text-4xl font-bold mb-12 border-l-8 border-blue-600 pl-6">The Working Principle</h2>
            </Fade>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <Slide direction='left'>
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <p>
                    Prism Vision operates on a <strong>dual-engine inference architecture</strong>. While standard computer vision models merely classify objects, our system utilizes a <strong>Vision Language Model (VLM)</strong> to interpret the narrative of an image.
                  </p>
                  <p>
                    When you upload an image, our FastAPI backend initiates two parallel processes. The first uses <strong>Ultralytics YOLO</strong> for state-of-the-art instance segmentation, drawing pixel-perfect boundaries around objects. Simultaneously, the VLM analyzes the spatial relationships and lighting, providing a descriptive text summary of what is happening in the scene.
                  </p>
                </div>
              </Slide>
              <Zoom>
                <div className="bg-slate-200 h-80 rounded-2xl flex items-center justify-center text-slate-400 font-mono italic">
                  [Visualization: VLM + YOLO Architecture]
                </div>
              </Zoom>
            </div>
          </div>
        </section>

        {/* Core Objectives Breakdown */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <Fade>
              <h2 className="text-4xl font-bold text-center mb-20">Project Objectives & Capabilities</h2>
            </Fade>

            <div className="space-y-32">
              {/* Objective 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <Fade direction="left">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4">Precision Instance Segmentation</h3>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      By leveraging the power of Ultralytics YOLO, Prism Vision provides more than just boxes.
                      We extract the exact polygon coordinates of every detected object, allowing for
                      surgical precision in area calculation and object isolation.
                    </p>
                  </div>
                </Fade>
                <Fade direction='right'>
                  <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 font-bold text-2xl">01</div>
                    <h4 className="text-lg font-semibold italic text-blue-500 mb-2">Powered by YOLOv11</h4>
                    <p className="text-slate-500">Real-time mask generation for complex environments.</p>
                  </div>
                </Fade>
              </div>

              {/* Objective 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <Fade direction='right'>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4">Multimodal Understanding</h3>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Our VLM integration allows the application to "discuss" the image. Users receive
                      natural language descriptions that explain the context, such as "A person is walking
                      a golden retriever in a rainy park," bridging the gap between raw data and human insight.
                    </p>
                  </div>
                </Fade>
                <Fade direction='left'>
                  <div className="flex-1 bg-indigo-600 p-8 rounded-3xl shadow-xl text-white">
                    <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center mb-6 font-bold text-2xl">02</div>
                    <h4 className="text-lg font-semibold italic opacity-80 mb-2">VLM Integration</h4>
                    <p className="opacity-90">Context-aware descriptive analytics for uploaded media.</p>
                  </div>
                </Fade>
              </div>

              {/* Objective 3 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <Fade direction='left'>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4">Permanent History with MongoDB</h3>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Every inference is valuable. Prism Vision stores every prediction, mask coordinate,
                      and VLM response in a scalable MongoDB instance. This allows users to track
                      changes over time and build a repository of visual intelligence.
                    </p>
                  </div>
                </Fade>
                <Fade direction='right'>
                  <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 font-bold text-2xl">03</div>
                    <h4 className="text-lg font-semibold italic text-green-500 mb-2">Persistent Data</h4>
                    <p className="text-slate-500">Securely stored results for future auditing and review.</p>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </section>

        {/* Huge Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">Prism Vision</h2>
              <p className="text-lg mb-6 max-w-md">
                The ultimate full-stack solution for high-fidelity computer vision.
                Built with Next.js, FastAPI, and Ultralytics to provide developers
                and researchers with instant multimodal insights.
              </p>
              <div className="flex space-x-4">
                {/* Social icons placeholders */}
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">GH</div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">LI</div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">TW</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Technology Stack</h4>
              <ul className="space-y-4">
                <li>Next.js & TypeScript</li>
                <li>FastAPI (Python)</li>
                <li>Ultralytics YOLO</li>
                <li>MongoDB</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Project Resources</h4>
              <ul className="space-y-4">
                <li>Technical Whitepaper</li>
                <li>API Documentation</li>
                <li>Inference Tutorials</li>
                <li>Community Support</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Prism Vision Project. All rights reserved. Designed for Multimodal Excellence.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

// Exporting the home compoent 
export default Home;