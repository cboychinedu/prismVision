// Using client server 
"use client";

// Importing the necessary modules 
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Fade } from 'react-awesome-reveal';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import AlertBox from '@/components/alertBox/alertBox';
import { alertType, loginType } from '@/components/types/authTypes';

// Creating the login component 
const Login = () => {
    // Setting the router 
    const router = useRouter();

    // Setting the alert state 
    const [alertDisplay, setAlert] = useState<alertType>({
        show: false,
        message: "",
        type: ""
    });

    // Setting the necessary credentials state
    const [credentials, setCredentials] = useState<loginType>({
        email: "",
        password: ""
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

    // Creating a function for setting the cookie 
    const setCookie = (cookie: string) => {
        // Setting the cookie, and making it globally. 
        Cookies.set("prismVisionToken", cookie, {
            expires: 1,
            path: "/"
        })
    }

    // Creating a function for handling the submit 
    const handleSubmit = async (event: React.FormEvent) => {
        // Prevent default submissing 
        event.preventDefault();

        // Checking the email input form 
        if (credentials.email === "") {
            // Displaying the alert box 
            setAlert({
                show: true,
                message: "Email address is required!",
                type: "error"
            });

            // Pausing the login proces 
            return;
        }

        // Checking if the email does not contain the "@" symbol 
        else if (!credentials.email.includes("@")) {
            // Displaying the alert box 
            setAlert({
                show: true,
                type: "error",
                message: "Email address is missing the @ symbol..."
            });

            // Pausing the submit process 
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
            // Getting the login data 
            const loginData = JSON.stringify(credentials);

            // Setting the backend login server url 
            const serverUrl: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/login`;

            // Using try catch block to send the request to the backend server 
            try {
                // Making the request to the login route 
                const response = await fetch(serverUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: loginData
                });

                // If there was no response from the server 
                if (!response.ok) {
                    // Handle the server side error 
                    const errorData = await response.json();

                    // Display the error message 
                    setAlert({
                        show: true,
                        message: errorData.message || "Login failed!",
                        type: "error",
                    });

                    // Auto hide the alert after 6 seconds 
                    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 6000);
                    return;
                }

                // Else if the server returned a response, get the response and convert it into a JSON object 
                else {
                    // Convert the response data into a json object 
                    const responseData = await response.json();

                    // If the user was registered, execute the block of code below 
                    if (responseData.status === "success") {
                        // Setting the cookie, and making it globally 
                        setCookie(responseData.token);

                        // Display the status message 
                        // setAlert({ show: true, message: responseData.message, type: "success" });

                        // Navigate the user to the dashbaord page 
                        router.push('/dashboard');

                    }

                    // Else, if the response data was an error, execute the 
                    // block of code below 
                    else {
                        // Display the alert message 
                        setAlert({ show: true, message: responseData.message, type: "error" });

                        // Auto hide the error after 7 seconds 
                        setTimeout(() => setAlert({ show: false, message: "", type: "" }), 7000);
                        return;
                    }
                }
            }

            // Catch the error 
            catch (error: any) {
                // Log the error to the console
                console.log("Error: ", error.message);

                // Display the message 
                setAlert({ show: true, message: "Error connection to the server.", type: "error" });

                // Pause the submission 
                return;
            }
        }
    }

    // Rendering the login jsx component 
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
            <main className="min-h-full bg-slate-900 flex items-center justify-center p-6 h-[100vh]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
                </div>
                {/* Form section */}
                <Fade cascade duration={4000}>
                    <div className="relative z-10 md:w-116.25 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-white mb-2">Login User </h1>
                            <p className="text-slate-400">Join the Prism Vision ecosystem</p>
                        </div>

                        <div className="space-y-6">
                            {/* Email field */}
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

                            {/* Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transdiv transition active:scale-95"
                            >
                                Login
                            </button>
                        </div>

                        <div className="mt-8 text-center text-slate-400">
                            <p>
                                Don't have an account?{' '}
                                <Link href="/register" className="text-blue-400 hover:underline font-semibold">
                                    Register here
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

// Exporting the login component 
export default Login