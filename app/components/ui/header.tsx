'use client'
import { Fragment, useEffect, useState, useRef } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, GlobeAltIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import useFirebaseAuth from '../../firebase/useFirebaseAuth'; // Adjust the path as per your project structure
import Navbar from './Navbar';
import Cart from './../Cart';
import TopHeader from './TopHeader';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface User {
    displayName?: string;
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, signOut } = useFirebaseAuth() as { user: User | null; signOut: () => Promise<void> };
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            setIsDropdownOpen(false); // Close dropdown after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false); // Close dropdown when mouse leaves profile or dropdown
    };

    return (
        <>
            <TopHeader />
            <header className={classNames("sticky top-0 z-50 transition-shadow", isScrolled ? "bg-white/95 backdrop-blur shadow-lg" : "bg-white")}>
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-1 space-x-4" aria-label="Global">
                    <div className="flex shrink-0  font-semibold text-4xl lg:flex-1">
                        <Link href="/">
                            <span className="text-orange-400 cursor-pointer">CeRRoute</span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex space-x-5 mr-1">
                        {/* Render Navbar content here */}
                        <Navbar />
                        {/* Search bar */}
                        <div className="flex items-center mt-1">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="text"
                                    style={{ width: '600px', border: '1px solid #ccc' }}
                                    className="pl-10 pr-3 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </Popover.Group>
                    <div className="flex items-center space-x-12">
                        <button
                            className="p-2"
                            onClick={handleCartToggle}
                        >
                            <ShoppingCartIcon className="colo h-6 w-6 text-orange-400" />
                        </button>

                        {/* Cart Component */}
                        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-start space-x-8">
                        {!user ? (
                            // Display login and signup links
                            <>
                                <Link href="/signin" className="text-sm font-semibold leading-6 text-white bg-orange-400 rounded-md px-3 py-1">
                                    Log In <span aria-hidden="true"></span>
                                </Link>
                                <Link href="/signup" className="text-sm font-semibold leading-6 text-white bg-orange-400 rounded-md px-3 py-1">
                                    Sign Up <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </>
                        ) : (
                            <div className="relative left-14" ref={dropdownRef}>
                                <button
                                    onMouseEnter={handleProfileClick}
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    {user.displayName
                                        ? user.displayName
                                            .split(' ')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')
                                        : ''}
                                </button>
                                {isDropdownOpen && (
                                    <div
                                        onMouseLeave={handleMouseLeave}
                                        className="absolute -left-14 mt-2 w-48 bg-white border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <Link href="/profile">
                                                    <span>My Profile</span>
                                                </Link>
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:flex space-x-8">
                        {/* Language selection dropdown */}
                        <div className="relative">
                            <Popover className="relative">
                                <Popover.Button
                                    className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900"
                                >
                                    <GlobeAltIcon className="h-6 w-6" />
                                    <span></span>
                                </Popover.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Popover.Panel
                                        static
                                        className="absolute -left-7 w-30 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                English
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Spanish
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                French
                                            </a>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <button className="p-4 text-gray-800">
                                    <ShoppingCartIcon className="h-6 w-6" />
                                </button>
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex items-center mt-6">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flow-root space-y-2">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Disclosure as="div" className="-mx-3">
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button
                                                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Categories
                                                    <ChevronDownIcon className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')} aria-hidden="true" />
                                                </Disclosure.Button>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                                <div className="py-6">
                                    <a
                                        href="/signin"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log In
                                    </a>
                                    <a
                                        href="/signup"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    );
}
