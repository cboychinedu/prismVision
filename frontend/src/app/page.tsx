/* =================================================================
 * Author: Engr. Mbonu Chinedum 
 * Date Created: 2026-04-17 6:38:42 AM 
 * Date Modified: 2026-04-17 8:14:35 PM
 * Project Name: Prism Vision
 * Location: Nigeria (Tinubu Administration)
 * * LICENSE: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC)
 * =================================================================
 * This software is provided as Open Source for educational and 
 * personal use. You are free to:
 * - SHARE: Copy and redistribute the material in any medium.
 * - ADAPT: Remix, transform, and build upon the material.
 *
 * UNDER THE FOLLOWING TERMS:
 * - ATTRIBUTION: You must give appropriate credit to the author.
 * - NON-COMMERCIAL: You may NOT use the material for commercial 
 * purposes. This software cannot be sold or used for profit.
 * ================================================================= */

"use client";

// Importing the necessary modules 
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import segmentationImage from "@/images/home/segmentationImage.jpeg";

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
        <Navbar />

        {/* Hero Section */}
        <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
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
                <Link href="/login">
                  <button className="px-8 py-4 bg-blue-600 rounded-lg text-lg font-bold hover:scale-105 transition-transform">
                    Launch Dashboard
                  </button>
                </Link>
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
                  <Image
                    className='w-full rounded-md'
                    src={segmentationImage}
                    alt="segmentationImage"
                    aria-label='segmentation label'
                  />
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
        <Footer />
      </div>
    </Fragment>
  );
};

// Exporting the home compoent 
export default Home;