import { useState } from 'react';
import Link from 'next/link';
import TopHeader from "@/app/components/ui/TopHeader";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // You can use Heroicons for icons

export default function BusinessHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <TopHeader/>
            <header className="bg-white border-b border-gray-300 relative" style={{ top: '10px' }}>
                <div className="container mx-auto flex justify-between items-center py-4">
                    <div className="text-4xl font-bold text-black">
                        <Link href="/">
                            <span className="text-orange-400">CeRRoute</span> Business
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/corporate/what-we-do">
                            <span className="text-gray-700 hover:text-black">Why CeRRoute</span>
                        </Link>
                        <Link href="/corporate/how-we-do-it">
                            <span className="text-gray-700 hover:text-black">Solutions</span>
                        </Link>
                        <Link href="/corporate/resources">
                            <span className="text-gray-700 hover:text-black">Resources</span>
                        </Link>
                        <Link href="/corporate/plans">
                            <span className="text-gray-700 hover:text-black mr-24">Plans</span>
                        </Link>

                        <div className=" flex space-x-4 items-center">
                            <Link href="/signin">
                                <span className="text-gray-700 hover:text-black">Login</span>
                            </Link>
                            <Link href="/signup">
                                <span
                                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">Sign Up</span>
                            </Link>
                            <button className="text-black hover:text-gray-800">
                                🌐
                            </button>
                        </div>
                    </nav>


                    <div className="flex space-x-4 items-center">
                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className="md:hidden">
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6 text-gray-700"/>
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-gray-700"/>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 shadow-lg z-20">
                        <nav className="flex flex-col items-center py-4">
                            <Link href="/corporate/what-we-do">
                                <span className="text-gray-700 hover:text-black py-2">Why CeRRoute</span>
                            </Link>
                            <Link href="/corporate/how-we-do-it">
                                <span className="text-gray-700 hover:text-black py-2">Solutions</span>
                            </Link>
                            <Link href="/corporate/resources">
                                <span className="text-gray-700 hover:text-black py-2">Resources</span>
                            </Link>
                            <Link href="/corporate/plans">
                                <span className="text-gray-700 hover:text-black py-2">Plans</span>
                            </Link>
                            <Link href="/signin">
                                <span className="text-gray-700 hover:text-black py-2">Login</span>
                            </Link>
                            <Link href="/signup">
                                <span className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 py-2">Sign Up</span>
                            </Link>
                            <button className="text-black hover:text-gray-800 py-2 ">
                                🌐
                            </button>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
