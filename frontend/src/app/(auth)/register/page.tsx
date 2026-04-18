// Using client 
"use client";

// Importing the necessary modules 
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import AlertBox from '@/components/alertBox/alertBox';
import { alertType, registerType } from '@/components/types/authTypes';

// Creating the register component 
const Register = () => {
    // Setting the router 
    const router = useRouter();

    // Setting the alert state 
    const [alertDisplay, setAlert] = useState<alertType>({
        show: false,
        message: "",
        type: "",
    });

    // Setting the necessary credentials states 
    const [credentials, setCredentials] = useState<registerType>({
        fullname: "",
        email: "",
        password: "",
    });

    // Creating a function for handling the change on the input forms 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    // Creating a function for closing the alert 
    const closeAlert = () => {
        // Setting the value of the alert show to false 
        setAlert({
            show: false,
            message: "",
            type: ""
        });
    };

    // Creating a function for handling the submit 
    const handleSubmit = async (event: React.FormEvent) => {
        // Prevent default submission 
        event.preventDefault();

        // Checking the fullname input form 
        if (credentials.fullname === "") {
            // Displaying the alert box 
            setAlert({
                show: true,
                message: "Fullname is required!",
                type: "error"
            });

            // Pause the submit process 
            return;
        }

        // Checking the email address input form 
        else if (credentials.email === "") {
            // Displaying the alert box 
            setAlert({
                show: true,
                message: "Email address is required!",
                type: "error"
            });

            // Pause the submit process 
            return;
        }

        // Checking if the email does not contain the "@" symbol 
        else if (!credentials.email.includes("@")) {
            // Displaying the alert box 
            setAlert({
                show: true,
                message: "Email address must include @...",
                type: "error"
            });

            // Pause the submit process 
            return;
        }

        // Checking the password input form 
        else if (credentials.password === "") {
            // Displaying the alert box 
            setAlert({
                show: true,
                message: "Password is required!",
                type: "error"
            });

            // Pause the submit process 
            return;
        }

        // Else if all validations pass, execute the block of code below 
        else {
            // Getting the registration data 
            const registrationData = JSON.stringify(credentials);

            // Setting the backend server URL 
            const serverUrl: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/register`;

            // Using try catch block to send the request to the backend server 
            try {
                // Making the request to the regiser route 
                const response = await fetch(serverUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: registrationData
                });

                // If there was no response from the server 
                if (!response.ok) {
                    // Handle the server side error 
                    const errorData = await response.json();

                    // Display the error message 
                    setAlert({
                        show: true,
                        message: errorData.message || "Registration failed!",
                        type: "error",
                    });

                    // Auto hide the alert after 6 seconds 
                    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 6000);
                    return;
                }

                // Else if the server returned a response, get the response and convert it into 
                // a JSON object 
                else {
                    // Convert the response data into a json object 
                    const responseData = await response.json();

                    // If the user was registered, execute the block of code below 
                    if (responseData.status === "success") {
                        // Display the status message 
                        setAlert({ show: true, message: responseData.message, type: "success" });

                        // Auto hide, and navigate the user to the login page 
                        setTimeout(() => { setAlert({ show: false, message: "", type: "" }); router.push("/login") }, 6000)
                    }

                    // Else if the response data status was not success 
                    else {
                        // Display the status message 
                        setAlert({ show: true, message: responseData.message, type: "error" });

                        // Auto hide the error after 7 seconds 
                        setTimeout(() => setAlert({ show: false, message: "", type: "" }), 7000);

                        // Pause the submission 
                        return;
                    }
                }
            }

            // Catch the error 
            catch (error: any) {
                // Log the error to the console 
                console.log("Error: ", error.message);

                // Display the error message 
                setAlert({ show: true, message: "Error connecting to the server.", type: "error" });

                // Pause the submission 
                return;
            }
        }
    }

    // Rendering the regiser jsx 
    return (
        <Fragment>
            {/* Adding the Navbar */}
            <Navbar />

            {/* Custom Alert Box */}
            {alertDisplay.show && (
                <AlertBox
                    show={alertDisplay.show}
                    message={alertDisplay.message}
                    type={alertDisplay.type}
                    setAlert={setAlert}
                />
            )}

            {/* Adding the main tag */}
            <main className="min-h-full bg-slate-900 flex items-center justify-center p-6 h-[120vh]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
                </div>

                <Fade cascade duration={4000}>
                    <div className="relative z-10 md:w-116.25 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-slate-400">Join the Prism Vision ecosystem</p>
                        </div>

                        <div className="space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    required
                                    value={credentials.fullname}
                                    onChange={handleChange}
                                    onClick={closeAlert}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={credentials.email}
                                    onChange={handleChange}
                                    onClick={closeAlert}
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={credentials.password}
                                    onChange={handleChange}
                                    onClick={closeAlert}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transdiv transition active:scale-95"
                            >
                                Register
                            </button>
                        </div>

                        <div className="mt-8 text-center text-slate-400">
                            <p>
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-400 hover:underline font-semibold">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </Fade>
            </main>

            {/* Adding the footer */}
            <Footer />
        </Fragment>
    )
}

// Exporting the register component 
export default Register