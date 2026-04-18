// Importing the necessary modules 
import { Fragment } from "react";

// Creating the footer component  
const Footer = () => {
    // Rendering the footer component 
    return (
        <Fragment>
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
        </Fragment>
    )
}

// Exporting the footer 
export default Footer; 