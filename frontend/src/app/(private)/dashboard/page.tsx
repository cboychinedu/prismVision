// Using client 
"use client";

// Importing the necessary modules 
import React, { useState, ChangeEvent, Fragment, useEffect } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Fade } from 'react-awesome-reveal';
import ReactMarkdown from 'react-markdown';
import { Upload, ImageIcon, Cpu, FileText, Loader2, Info } from 'lucide-react';

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
            const response = await fetch('http://localhost:3001/dashboard', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error("Analysis failed");
            const data = await response.json();

            // Expecting backend to return: 
            // { "segmented_image": "base64_string_or_url", "vlm_text": "description..." }
            setProcessedImage(data.segmentedImage);
            setVlmDescription(data.vlmText);
        } catch (error) {
            console.log("Error analyzing image:", error);
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
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inference Dashboard</h1>
                        <p className="text-slate-500">Multimodal YOLOv11 + Gemma 3 VLM Analysis Pipeline</p>
                    </header>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Column: Upload */}
                        <div className="lg:col-span-4 space-y-6">
                            {previewUrl && (
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                                    <p className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Input Preview</p>
                                    <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-lg" />
                                </div>
                            )}

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <label className="block text-sm font-semibold text-slate-700 mb-4">Source Media</label>
                                <div className="relative group border-2 border-dashed border-slate-300 rounded-xl p-8 transition-colors hover:border-blue-400 flex flex-col items-center justify-center bg-slate-50">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
                                    <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-500 mb-3" />
                                    <p className="text-sm text-slate-500 text-center">{selectedFile ? selectedFile.name : "Click to upload image"}</p>
                                </div>

                                <button
                                    onClick={handleAnalyze}
                                    disabled={!selectedFile || loading}
                                    className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Cpu className="w-5 h-5" />}
                                    {loading ? "Synthesizing..." : "Run Multimodal Inference"}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Results */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Segmentation Display */}
                            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
                                <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <ImageIcon className="w-5 h-5 text-blue-400" />
                                        Segmentation Result
                                    </div>
                                    <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase tracking-tighter">YOLOv11-SEG</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center p-6">
                                    {processedImage ? (
                                        <div className='w-[100%] flex items-center justify-center'>
                                            <img src={processedImage} alt="Result" className="w-[80%] h-[500px] rounded-lg shadow-2xl border border-slate-700" />
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 text-center italic">Awaiting neural processing...</div>
                                    )}
                                </div>
                            </div>

                            {/* VLM Markdown Analysis */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between font-bold text-slate-700">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-indigo-500" />
                                        Gemma 3 Narrative Report
                                    </div>
                                    {vlmDescription && <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">LLM GENERATED</span>}
                                </div>

                                <div className="p-8 prose prose-slate max-w-none">
                                    {vlmDescription ? (
                                        <Fade>
                                            <div className="vlm-content text-[15px] text-slate-700 leading-relaxed space-y-4">
                                                <ReactMarkdown
                                                    components={{
                                                        // Custom styling for bold text
                                                        strong: ({ node, ...props }) => <span className="font-bold text-slate-900" {...props} />,
                                                        // Custom styling for bullet lists
                                                        li: ({ node, ...props }) => <li className="ml-4 list-disc marker:text-blue-500" {...props} />,
                                                        // Adding emphasis to sections
                                                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-blue-600 mt-6 mb-2" {...props} />
                                                    }}
                                                >
                                                    {vlmDescription}
                                                </ReactMarkdown>
                                            </div>
                                        </Fade>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                                            <div className="h-4 bg-slate-100 rounded w-2/3 animate-pulse"></div>
                                        </div>
                                    )}
                                </div>

                                {vlmDescription && (
                                    <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-start gap-3">
                                        <Info className="w-4 h-4 text-slate-400 mt-0.5" />
                                        <p className="text-[11px] text-slate-500 italic">
                                            This analysis combines YOLOv11 instance segmentation grounding with Gemma 3 semantic reasoning.
                                        </p>
                                    </div>
                                )}
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