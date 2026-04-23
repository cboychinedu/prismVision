// Using client 
"use client";

// Importing the necessary modules 
import Link from 'next/link';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import { Fade } from 'react-awesome-reveal';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { AttentionSeeker } from 'react-awesome-reveal';
import React, { useState, useEffect, Fragment } from 'react';
import {
    History,
    Trash2,
    ArrowLeft,
    ExternalLink,
    Clock,
    Calendar
} from 'lucide-react';

// Setting the analysis history interface
interface AnalysisHistory {
    _id: string;
    email: string;
    segementedImage: string;
    vlmText: string;
    duration: string;
    date?: string;
}

// Creating the history component
const history = () => {
    // Getting the user cookies 
    const userToken = Cookies.get("prismVisionToken") || null;

    // Setting the history state 
    const [history, setHistory] = useState<AnalysisHistory[]>([]);
    const [animateKey, setAnimateKey] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    // Creating a function for fetching the history data on 
    // component mount 
    const fetchHistory = async () => {
        // Setting the server url 
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/history`;

        // Using try catch block to connect to the backend server 
        try {
            // Making a request to the backend server 
            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: { "prismVisionToken": userToken as string }
            });

            // Getting the response data 
            const data = await response.json();

            // if the data status was a success
            if (data.status === "success") {
                // Getting the history data 
                let historyData = JSON.parse(data.history);
                // console.log(historyData)

                // checking if the returned history was null values 
                if (historyData.length <= 0) {
                    // Set the history as an empty array 
                    setHistory([]);
                }

                // Else if the history data contains no data, execute the block of 
                // code below 
                else {
                    // Setting the history values 
                    setHistory(historyData);
                }
            }

            // Else if the error was occured 
            else {
                // Set an empty array 
                setHistory([]);
            }
        }

        // Catch the error 
        catch (error) {
            // Log the error to the console
            console.log("Failed to load the history: ", error);
            setHistory([])
        }

        // Finally remove the loading screen 
        finally {
            // Removing the loading screen 
            setIsLoading(false);
        }
    }

    // Creating a function for deleting the analyzed data 
    const deleteItem = (_id: string) => {
        // Triggering the sweet alert confirmation modal screen 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this analysis data!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#e7280c",
            confirmButtonText: "Yes, delete it!",
            background: "#ffffff",
            color: "#0f172a"
        })
            .then(async (result) => {
                // If the user clicked the confirm button 
                if (result.isConfirmed) {
                    // Using try catch block to send the id to the server 
                    try {
                        // Setting the server url for deletion 
                        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/delete`;

                        // Making the DELETE request to the backend 
                        const response = await fetch(serverUrl, {
                            method: "DELETE",
                            headers: { 'Content-Type': 'application/json', 'prismVisionToken': userToken as string },
                            body: JSON.stringify({ _id: _id })
                        });

                        // Getting the response from the server as a JSON object 
                        const data = await response.json();

                        // if the backend confirmed the deletion 
                        if (data.status === "success") {
                            // Update the local state to remove the item from the UI 
                            const updated = history.filter(item => item._id !== _id);
                            setHistory(updated);

                            // Showing the success message 
                            Swal.fire({
                                "title": "History Deleted!",
                                "text": "The analysis record has been removed!",
                                "icon": "success"
                            });
                        }

                        // Else if there was an error 
                        else {
                            // Log the error message 
                            console.log("Error: ", data.message);

                            // Display the error message 
                            Swal.fire({ title: "Error", text: "Error deleting the record!", icon: "error" });
                        }
                    }

                    // Catching the error 
                    catch (error) {
                        // Displaying the error message 
                        console.log("Error: ", error);

                        // Displaying the error message 
                        Swal.fire({ title: "Error", text: "Could not delete the record. Please try again!", icon: "error" });
                    }
                }

                // Close the modal screen 
                else {
                    // Close the modal screen 
                    // Notify the user that the action was cancelled
                    Swal.fire({
                        title: "Cancelled",
                        text: "Your analysis data is safe :)",
                        icon: "info",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            })
    }

    // 
    const clearAll = () => {
        if (confirm("Permanently delete all inference history?")) {
            setHistory([]);
            localStorage.removeItem('prism_vision_history');
        }
    };

    // Setting the interval 
    useEffect(() => {
        // Setting the interval 
        const interval = setInterval(() => {
            // Incremeting by 1 
            setAnimateKey((prev) => prev + 1);
        }, 7000);

        // Load the history data 
        fetchHistory();

        // Redundant information >> could be removed tomorrow... 
        const saved = localStorage.getItem('prism_vision_history');
        if (saved) setHistory(JSON.parse(saved));

        // Clearing the interval 
        return () => clearInterval(interval);
    }, []);

    // Rendering the jsx component 
    return (
        <Fragment>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                {/* Adding the navbar */}
                <Navbar />

                {/* Adding the main div */}
                <main className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        <div>
                            <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 text-sm font-bold mb-2 hover:underline">
                                <ArrowLeft size={16} /> Back to Inference
                            </Link>
                            <AttentionSeeker
                                key={animateKey}
                                effect="shake"
                                cascade
                                damping={4000}
                                duration={7000}
                            >
                                <div>
                                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                        <History className="text-slate-400" /> Session History
                                    </h1>
                                </div>
                            </AttentionSeeker>
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

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-20 text-center">
                            <History size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No past inferences found in this session.</p>
                            <Link href="/dashboard" className="mt-4 inline-block text-blue-600 font-bold">Start analyzing images</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {history.map((item: any, index: number) => (
                                <Fade key={item._id || index}>
                                    <div key={item._id}>
                                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row">
                                            {/* Image Preview */}
                                            <div className="lg:w-1/3 bg-slate-100 relative">
                                                <img src={item.segementedImage} alt="Inference" className="w-full h-64 lg:h-full object-cover" />
                                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                                    <Calendar size={12} /> {item.date || "Today"}
                                                    <Clock size={12} /> {item.timestamp}
                                                </div>
                                            </div>

                                            {/* Content Analysis */}
                                            <div className="lg:w-2/3 p-8 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h3 className="text-lg font-bold text-slate-800 truncate pr-4">Duration: {item.duration.toFixed(3)}</h3>
                                                        <button onClick={() => deleteItem(item._id)} className="text-slate-300 hover:text-red-500 transition">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    <div className="prose prose-slate max-w-none line-clamp-6 text-sm text-slate-600 leading-relaxed">
                                                        <ReactMarkdown>{item.vlmText}</ReactMarkdown>
                                                    </div>
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                                                    <span className="text-[10px] font-mono text-slate-400 uppercase">ID: {item._id}</span>
                                                    <Link href={`/dashboard/${item._id}`} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                                        View in full detail... <ExternalLink size={14} />
                                                    </Link>
                                                </div>
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