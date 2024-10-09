'use client';
import './css/globals.css';
import { Inter } from 'next/font/google';
import Header from './components/ui/header';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import MainButton from "@/app/components/MainButton";
import { usePathname } from 'next/navigation';
import BusinessHeader from "@/app/components/ui/BusinessHeader";
import InstructorHeader from "@/app/components/ui/InstructorHeader";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname(); // Get the current path

    // Determine which header to display based on the pathname
    let HeaderComponent;
    if (pathname.startsWith('/corporate')) {
        HeaderComponent = BusinessHeader;
    } else if (pathname.startsWith('/instructor')) {
        HeaderComponent = InstructorHeader;
    } else {
        HeaderComponent = Header;
    }

    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/fav.jpg" />
            <title>Cerroute</title>
            <meta name="description" content="Cerroute" />
        </head>
        <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <AuthProvider>
                <CartProvider>
                    <HeaderComponent />
                    {children}
                </CartProvider>
            </AuthProvider>
            <MainButton />
        </div>
        </body>
        </html>
    );
}
