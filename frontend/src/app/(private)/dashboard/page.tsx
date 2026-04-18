// Using client 
"use client";

// Importing the necessary modules 
import React, { useState, ChangeEvent, Fragment } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Upload, ImageIcon, Cpu, FileText, Loader2 } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';

// Creating the dashbaord component 
const Dashboard = () => {
    // Setting the state 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [vlmDescription, setVlmDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            // Reset previous results
            setProcessedImage(null);
            setVlmDescription("");
        }
    };

    // Upload to Backend
    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Replace with your actual FastAPI endpoint
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error("Analysis failed");

            const data = await response.json();

            // Expecting backend to return: 
            // { "segmented_image": "base64_string_or_url", "vlm_text": "description..." }
            setProcessedImage(data.segmented_image);
            setVlmDescription(data.vlm_text);
        } catch (error) {
            console.error("Error analyzing image:", error);
            alert("Failed to process image. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    // Rendering the jsx component 
    return (
        <Fragment>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                <Navbar />

                <main className="max-w-7xl mx-auto px-6 py-7.5 mt-3 mb-25">
                    <header className="mb-12">
                        <h1 className="text-3xl font-bold text-slate-900">Inference Dashboard</h1>
                        <p className="text-slate-500">Upload an image to trigger YOLOv11 Segmentation and VLM Analysis.</p>
                    </header>

                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Left Column: Upload & Controls */}
                        <div className="lg:col-span-4 space-y-6">
                            <div>
                                {/* Preview of Original */}
                                {previewUrl && (
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                                        <p className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Original Preview</p>
                                        <img src={previewUrl} alt="Preview" className="w-full h-56.25 rounded-lg" />
                                    </div>
                                )}
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <label className="block text-sm font-semibold text-slate-700 mb-4">
                                    Source Media
                                </label>

                                <div className="relative group border-2 border-dashed border-slate-300 rounded-xl p-8 transition-colors hover:border-blue-400 flex flex-col items-center justify-center bg-slate-50">
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-500 mb-3" />
                                    <p className="text-sm text-slate-500 text-center">
                                        {selectedFile ? selectedFile.name : "Click or drag to upload image"}
                                    </p>
                                </div>

                                <button
                                    onClick={handleAnalyze}
                                    disabled={!selectedFile || loading}
                                    className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition
                                    ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Cpu className="w-5 h-5" />}
                                    {loading ? "Processing..." : "Run Multimodal Inference"}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Results */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Segmentation Output */}
                            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
                                <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <ImageIcon className="w-5 h-5 text-blue-400" />
                                        Instance Segmentation Output
                                    </div>
                                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                                        YOLOv11 Engine
                                    </span>
                                </div>

                                <div className="flex-1 flex items-center justify-center p-6">
                                    {processedImage ? (
                                        <Fade>
                                            <img src={processedImage} alt="Segmented Result" className="max-w-full h-auto rounded-lg shadow-2xl" />
                                        </Fade>
                                    ) : (
                                        <div className="text-slate-500 flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 opacity-20" />
                                            </div>
                                            <p className="italic">Awaiting inference results...</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* VLM Text Output */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 font-bold text-slate-700">
                                    <FileText className="w-5 h-5 text-indigo-500" />
                                    VLM Narrative Analysis
                                </div>
                                <div className="p-8">
                                    {vlmDescription ? (
                                        <Fade>
                                            <p className="text-xl text-slate-700 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-blue-600">
                                                {vlmDescription}
                                            </p>
                                        </Fade>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                                            <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};

// Exporting the dashboard component 
export default Dashboard;