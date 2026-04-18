// Importing the necessary modules 
import { Fragment } from "react";
import Image from 'next/image';
import Link from 'next/link';
import logoImage from "@/images/home/prism-vision-logo.png";

// Creating the navbar component 
const Navbar = () => {
    // Rendering the navbar component 
    return (
        <Fragment>
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/">
                        <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            <Image src={logoImage} height={45} width={45} className="h-11.25 w-11.25 rounded-full" alt="imageLogo" />
                        </div>
                    </Link>
                    <div className="hidden md:flex space-x-8 font-medium">
                        <Link href="/#about" className="hover:text-blue-600 transition">About</Link>
                        <Link href="/#workflow" className="hover:text-blue-600 transition">Workflow</Link>
                        <Link href="/#features" className="hover:text-blue-600 transition">Features</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/login">
                            <button className="px-5 py-2 text-blue-600 font-semibold">Login</button>
                        </Link>
                        <Link href="/register">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

// Exporting the navbar 
export default Navbar; 