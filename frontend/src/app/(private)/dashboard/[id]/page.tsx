// Using client 
"use client";

// Importing the necessary modules 
import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/footer/footer';
import { Fade } from 'react-awesome-reveal';
import { AttentionSeeker } from "react-awesome-reveal";
import { Props } from "@/components/types/dashboardTypes";
import {
    ImageIcon,
    FileText,
    Info
} from 'lucide-react';
import {
    useState,
    Fragment,
    useEffect,
    use
} from 'react';

// Creating the inferenc display function 
const InferenceDisplay = ({ params }: Props) => {
    // Setting the router 
    const router = useRouter();

    // Setting the state and getting the necessary route parameters 
    const [isLoading, setIsLoading] = useState(true);
    const [processedImage, setProcessedImage] = useState("");
    const [vlmDescription, setVlmDescription] = useState("");
    const [animateKey, setAnimateKey] = useState(0);
    const { id } = use(params);

    // Creating a function to send the id value to the backend to load the analysis 
    const displayInferenceData = async () => {
        // Setting the server url 
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/${id}`;

        // Using try catch block to connect to the backend server
        try {
            // Getting the user token from the cookies 
            const userToken = Cookies.get("prismVisionToken");

            // Making a request to the backend server 
            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: { "prismVisionToken": userToken as string }
            });

            // On a failed response 
            if (!response.ok) { setVlmDescription("Error in connecting to the server!"); }

            // Getting the response json data 
            const data = await response.json();

            // if the data status was a success, execute the block of code below 
            if (data.status === "success") {
                // Converting the inference result into a JSON object
                const inferenceResult = JSON.parse(data.inferenceResult);

                // console.log(typeof inferenceResult.)
                setProcessedImage(inferenceResult.segementedImage);
                setVlmDescription(inferenceResult.vlmText);

                // Setting the loading to false 
                setIsLoading(false);

            }

            // Else show the error message 
            else {
                // Display the error message 
                // setVlmDescription(data.message);
                setIsLoading(true);
                router.push("/dashboard");
            }
        }

        // Catch the error 
        catch (error) {
            // Log the error message to the console 
            console.dir("Failed to load the inference result: ", error);
            router.push("/dashboard");
            // // Set the loading to false 
            // setIsLoading(false);
        }
    }

    // Using use effect to fetch the history data on 
    // component mount 
    useEffect(() => {
        // Setting the interval 
        const interval = setInterval(() => {
            // Incremeting by 1 
            setAnimateKey((prev) => prev + 1);
        }, 7000);

        // Runing the display inference data 
        displayInferenceData();

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
                <main className="max-w-7xl mx-auto px-6 py-7.5 mt-3 mb-25">
                    <AttentionSeeker
                        key={animateKey}
                        effect="shake"
                        cascade
                        damping={4000}
                        duration={7000}
                    >
                        <header className="mb-12">
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inference Display </h1>
                            <p className="text-slate-500">Multimodal YOLOv11 + Gemma 3 VLM Analysis Pipeline</p>
                        </header>
                    </AttentionSeeker>

                    {/* Show a loading screen while the client fetches the data from 
                    the server..  */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-12 gap-8">
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
                                                <Image
                                                    src={processedImage}
                                                    alt="Result"
                                                    width={1000}
                                                    height={500}
                                                    className="lg:w-[80%] w-full max-h-full rounded-lg shadow-2xl border border-slate-700"
                                                />
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
                    )}




                </main>

                {/* Adding the footer */}
                <Footer />
            </div>
        </Fragment>
    );
}

// Exporting the inference display 
export default InferenceDisplay; 