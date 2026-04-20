"use client";

import React, { useState, useEffect, Fragment } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { History, Trash2, ArrowLeft, ExternalLink, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Fade } from 'react-awesome-reveal';

interface AnalysisHistory {
    id: string;
    image: string;
    description: string;
    fileName: string;
    timestamp: string;
    date: string;
}

const history = () => {
    const [history, setHistory] = useState<AnalysisHistory[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('prism_vision_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const deleteItem = (id: string) => {
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem('prism_vision_history', JSON.stringify(updated));
    };

    const clearAll = () => {
        if (confirm("Permanently delete all inference history?")) {
            setHistory([]);
            localStorage.removeItem('prism_vision_history');
        }
    };

    return (
        <Fragment>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                <Navbar />
                <main className="max-w-7xl mx-auto px-6 py-12">

                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        <div>
                            <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 text-sm font-bold mb-2 hover:underline">
                                <ArrowLeft size={16} /> Back to Inference
                            </Link>
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                <History className="text-slate-400" /> Session History
                            </h1>
                        </div>
                        {history.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition"
                            >
                                <Trash2 size={16} /> Clear All Records
                            </button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-20 text-center">
                            <History size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No past inferences found in this session.</p>
                            <Link href="/dashboard" className="mt-4 inline-block text-blue-600 font-bold">Start analyzing images</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {history.map((item) => (
                                <Fade key={item.id}>
                                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row">
                                        {/* Image Preview */}
                                        <div className="lg:w-1/3 bg-slate-100 relative">
                                            <img src={item.image} alt="Inference" className="w-full h-64 lg:h-full object-cover" />
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                                <Calendar size={12} /> {item.date || "Today"}
                                                <Clock size={12} /> {item.timestamp}
                                            </div>
                                        </div>

                                        {/* Content Analysis */}
                                        <div className="lg:w-2/3 p-8 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-lg font-bold text-slate-800 truncate pr-4">{item.fileName}</h3>
                                                    <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-red-500 transition">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="prose prose-slate max-w-none line-clamp-6 text-sm text-slate-600 leading-relaxed">
                                                    <ReactMarkdown>{item.description}</ReactMarkdown>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                                                <span className="text-[10px] font-mono text-slate-400 uppercase">ID: {item.id}</span>
                                                <Link href={`/dashboard?id=${item.id}`} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                                    Open in Editor <ExternalLink size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </Fragment>
    );
};

export default history;