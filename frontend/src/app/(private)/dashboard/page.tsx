// Using client 
"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import AlertBox from '@/components/alertBox/alertBox';
import { AttentionSeeker } from 'react-awesome-reveal';
import { alertType } from '@/components/types/authTypes';
import {
    Upload,
    Cpu,
    Loader2,
} from 'lucide-react';
import {
    useState,
    ChangeEvent,
    Fragment,
    useEffect
} from 'react';

// Creating the dashbaord component 
const Dashboard = () => {
    // Setting the router 
    const router = useRouter();

    // Setting the state 
    const [loading, setLoading] = useState<boolean>(false);
    const [animateKey, setAnimateKey] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Setting the alert state 
    const [alertDisplay, setAlert] = useState<alertType>({
        show: false,
        message: "",
        type: ""
    });

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Getting the image 
        const file = e.target.files?.[0];

        // if the image file exists, execute the block 
        // of code below 
        if (file) {
            // set the selected file as the image to 
            // display the image 
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Send the image to the back end using post request 
    const handleAnalyze = async () => {
        // Check if the image file is present 
        if (selectedFile == null) {
            // Display a warning message 
            setAlert({
                show: true,
                message: "Select an image!",
                type: "warning",
            });

            // Pause the submission 
            return;
        }

        // Set loading as true 
        setLoading(true);

        // Build the form data and append the image file into 
        // the form data 
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Setting the server url 
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`;

        // Using try catch block to connect to the server 
        try {
            // Getting the user token from the cookies 
            const userToken = Cookies.get("prismVisionToken");

            // Replace with your actual FastAPI endpoint
            const response = await fetch(serverUrl, {
                headers: { "prismVisionToken": userToken as string },
                method: 'POST',
                body: formData,

            });

            // On a failed response 
            if (!response.ok) { console.log("Error in connecting to the server!") }

            // Getting the json data
            const data = await response.json();

            // Checking the status of the data for success
            if (data.status === "success") {
                // // Set the segemeted image and VLM text
                // setProcessedImage(data.segmentedImage);
                // setVlmDescription(data.vlmText);
                router.push(`/dashboard/${data.id}`);
            }

            // if the status is semi-complete 
            else if (data.status === "semi-complete") {
                // // Setting the segemented image and vlm text 
                // setProcessedImage(data.segmentedImage);
                // setVlmDescription(data.vlmText);
                router.push(`/dashboard/${data.id}`);
            }

            // Else if the status was an error 
            else {
                // Setting the segmeted image and the error message 
                // Display an error message 
                setAlert({
                    show: true,
                    message: data.message,
                    type: "error"
                });
            }

        } catch (error: any) {
            // log the error to the console 
            setAlert({
                show: true,
                message: error as string,
                type: "error"
            });

        } finally {
            // Set loading as false 
            setLoading(false);
        }
    };

    // Using use effect to display the animation 
    useEffect(() => {
        // Setting the interval 
        const interval = setInterval(() => {
            // incrementing by 1 
            setAnimateKey((prev) => prev + 1);
        }, 7000);

        // Clearing the interval 
        return () => clearInterval(interval);
    })

    // Rendering the jsx component 
    return (
        <Fragment>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                {/* Adding the navbar */}
                <Navbar />

                {/* Adding the alert box */}
                {alertDisplay.show && (
                    <AlertBox
                        show={alertDisplay.show}
                        message={alertDisplay.message}
                        type={alertDisplay.type}
                        setAlert={setAlert}
                    />
                )}

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
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inference Dashboard</h1>
                            <p className="text-slate-500">Multimodal YOLOv11 + Gemma 3 VLM Analysis Pipeline</p>
                        </header>
                    </AttentionSeeker>

                    <div className="grid lg:w-[45%] w-full">
                        {/* Left Column: Upload */}
                        <div className="lg:col-span-4 space-y-6">
                            {previewUrl && (
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                                    <p className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Input Preview</p>
                                    <img src={previewUrl} alt="Preview" className="w-full h-75 rounded-lg" />
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
                                    // disabled={!selectedFile || loading}
                                    className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Cpu className="w-5 h-5" />}
                                    {loading ? "Synthesizing..." : "Run Multimodal Inference"}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Adding the footer */}
                <Footer />
            </div>
        </Fragment>
    );
};

// Exporting the dashboard component 
export default Dashboard;