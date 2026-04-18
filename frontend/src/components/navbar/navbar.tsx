// Using client 
"use client";

// Importing the necessary modules 
import { Fragment, useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import logoImage from "@/images/home/prism-vision-logo.png";

// Creating the navbar component 
const Navbar = () => {
    // Setting the router object 
    const router = useRouter();

    // Creating a state for the login status, default to false 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Using use effect 
    useEffect(() => {
        // Mounting the component 
        setMounted(true);

        // Getting the user's token from the cookie storage 
        const userToken = Cookies.get("prismVisionToken");

        // If the user token is present 
        if (userToken) {
            // Using try, catch block to decode the user token 
            try {
                // Decode the token 
                const decodedToken: any = jwtDecode(userToken);

                // Setting the logged in value 
                setIsLoggedIn(decodedToken.isLoggedIn || false);
            }

            // Catch the error in decoding the token 
            catch (error) {
                // Log the error to the console 
                console.log("Error: ", error);
                setIsLoggedIn(false);
            }
        }
    }, []);

    // Creating a function for handling the logout function 
    const handleLogout = () => {
        // Remove the user token 
        Cookies.remove("prismVisionToken");
        setIsMenuOpen(false);

        // Wait for 1 seconds and redirect the user to the home page 
        setTimeout(() => router.push("/login"), 1000);
    };

    // Don't render anything until mounted to prevent hydration mismatch 
    if (!mounted) return null;

    // Rendering the navbar component 
    return (
        <Fragment>
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo Display */}
                    <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex justify-center items-center gap-x-[10px] ">
                        <div className="text-2xl font-bold">
                            <Image src={logoImage} height={45} width={45} className="h-11.25 w-11.25 rounded-full" alt="imageLogo" />
                        </div>
                        <div>
                            <h2 className="text-[24px]"> Prism <span className="text-indigo-600 text-[24px]"> Vision </span> </h2>
                        </div>
                    </Link>

                    {/* Desktop Middle Links */}
                    {!isLoggedIn && (
                        <div className="hidden md:flex space-x-8 font-medium text-slate-700">
                            <Link href="/#about" className="hover:text-blue-600 transition">About</Link>
                            <Link href="/#workflow" className="hover:text-blue-600 transition">Workflow</Link>
                            <Link href="/#features" className="hover:text-blue-600 transition">Features</Link>
                        </div>
                    )}

                    <div className="hidden md:flex space-x-4 items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/dashboard" className="px-2 py-2 text-blue-600 font-semibold">Dashboard</Link>
                                <Link href="/dashboard/history" className="px-2 py-2 text-blue-600 font-semibold">History</Link>
                                <button
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-[6px] text-sm font-semibold hover:bg-indigo-700 transition"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <button className="px-5 py-2 text-blue-600 font-semibold">Login</button>
                                </Link>
                                <Link href="/register">
                                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="text-slate-600 p-2"
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay (Clickable backdrop) */}
                <div
                    className={`fixed inset-0 bg-slate-900/50 z-[60] transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Mobile Sidebar Menu - 65% width, Solid White */}
                <div
                    className={`fixed top-0 left-0 h-[100vh] w-[80%] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="flex flex-col h-full bg-white">
                        {/* Header inside the sidebar */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                            <Image src={logoImage} height={40} width={40} className="h-11.25 w-11.25 rounded-full" alt="imageLogo" />
                            <button onClick={() => setIsMenuOpen(false)} className="text-slate-500">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Sidebar Navigation Links */}
                        <div className="flex flex-col p-6 space-y-6 bg-white flex-grow">
                            {!isLoggedIn ? (
                                <>
                                    <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">About</Link>
                                    <Link href="/#workflow" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">Workflow</Link>
                                    <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">Features</Link>
                                    <hr className="border-slate-100" />
                                    <Link
                                        href="/login"
                                        className="py-2.5 px-2.5 pl-2.5 text-center rounded-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 border border-blue-500 hover:border-transparent">
                                        Login
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold">Get Started</button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg  text-slate-700 font-bold">Dashboard</Link>
                                    <Link href="/dashboard/history" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">History</Link>
                                    <Link href="/dashboard/settings" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">Settings</Link>
                                    <div className="pt-4 h-full flex-col flex">
                                        <button
                                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg mt-auto"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

// Exporting the navbar 
export default Navbar;