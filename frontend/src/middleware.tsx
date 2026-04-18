// Importing the necessary modules 
import { NextResponse, NextRequest } from 'next/server'

// Creating and exporting the function to handle the routing middleware
export function middleware(request: NextRequest) {
    // Get the user's cookies from the browser
    const token = request.cookies.get("prismVisionToken")?.value;
    const adminToken = request.cookies.get("adminPrismVisionToken")?.value;

    // console.log("Token in middleware:", token);
    // Get the route path name from the request nextURL 
    const { pathname } = request.nextUrl;

    // Checking if the route path name starts with "/dashboard"
    const isDashboardRoute = pathname.startsWith('/dashboard');

    // Checking if the route path name starts with "/admin" 
    const isAdminRoute = pathname.startsWith("/admin/dashboard")

    // Checking if the path name is "/login" or "/register"
    const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/admin/login';

    // If the route path name starts with "/dashboard", and the token is not found, 
    // execute the block of code below by redirecting the user to the login page 
    if (isDashboardRoute && !token) {
        // Redirection to the login page 
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // PROTECT ADMIN ROUTES
    if (isAdminRoute && !adminToken) {
        // If they try to access any /admin page without an admin token, send to admin login
        // Note: Ensure your admin login page isn't also prefixed with /admin or handle it specifically
        return NextResponse.redirect(new URL('/admin', request.url));

    }

    // if the route path name is "/login" or "/register", and the token 
    // is found, redirect the user to the dashboard page 
    if (isAuthPage) {
        // If an admin is logged in, send them to admin dashboard
        if (adminToken) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
        // If a standard user is logged in, send them to user dashboard
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // Return the next response. 
    return NextResponse.next();
}

// Exporting the configurations 
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/login',
        '/register',
        '/admin/login'
    ],
}