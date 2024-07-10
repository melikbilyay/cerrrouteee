'use client'

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { GlobeAltIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';


const categories = [
    {
        name: 'Computer Science',
        href: '#',
        icon: ChartPieIcon,
        subcategories: [
            { name: 'Cyber Security', href: '#' },
            { name: 'Information Systems', href: '#' },
            { name: 'Computer Security', href: '#' },
            { name: 'Microsoft Power BI', href: '#' },
            { name: 'Business Intelligence', href: '#' },
            { name: 'Microsoft Excel', href: '#' },
        ],
    },
    {
        name: 'Data Science',
        href: '#',
        icon: CursorArrowRaysIcon,
        subcategories: [
            { name: 'Data Analysis', href: '#' },
            { name: 'Big Data - Sıfırdan ve Gelişmiş iki düzeyde eğitim', href: '#' },
            { name: 'Data Modeling', href: '#' },
            { name: 'Data Analysis Expressions (DAX)', href: '#' },
        ],
    },
    {
        name: 'Web Development',
        href: '#',
        icon: FingerPrintIcon,
        subcategories: [
            { name: 'Web Development', href: '#' },
            { name: 'Python', href: '#' },
            { name: 'JavaScript', href: '#' },
            { name: 'React JS', href: '#' },
            { name: 'CSS', href: '#' },
            { name: 'HTML', href: '#' },
            { name: 'ASP.NET Core', href: 'http://ASP.NET' },
            { name: 'Node.Js', href: '#' },
            { name: 'UI Design', href: '#' },
            { name: 'UX Design', href: '#' },
        ],
    },
    {
        name: 'Mobile Development',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Google Flutter', href: '#' },
            { name: 'Android Development', href: '#' },
            { name: 'İOS Development', href: '#' },
            { name: 'React Native', href: '#' },
            { name: 'Dart (programming language)', href: '#' },
            { name: 'Swift', href: '#' },
            { name: 'Kotlin', href: '#' },
            { name: 'Mobile App Development', href: '#' },
            { name: 'SwiftUI', href: '#' },
            { name: '.NET MAUI', href: '#' },
        ],
    },
    {
        name: 'Game Development',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Unreal Engine', href: '#' },
            { name: 'Unity', href: '#' },
            { name: 'Game Development Fundamentals', href: '#' },
            { name: 'Godot', href: '#' },
            { name: 'C# (programming language)', href: '#' },
            { name: 'C++ (programming language)', href: '#' },
            { name: '3D Game Development', href: '#' },
            { name: '2D Game Development', href: '#' },
            { name: 'Unreal Engine Blueprints', href: '#' },
            { name: 'Blender', href: '#' },
        ],
    },
    {
        name: 'Entrepreneurship',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Startup', href: '#' },
            { name: 'Entrepreneurship Fundamentals', href: '#' },
            { name: 'Business Fundamentals', href: '#' },
            { name: 'Business Plan', href: '#' },
            { name: 'Business Strategy', href: '#' },
            { name: 'Online Business', href: '#' },
            { name: 'Freelancing', href: '#' },
            { name: 'Presentation', href: '#' },
        ],
    },
    {
        name: 'Artificial Intelligence',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'ChatGPT', href: '#' },
            { name: 'ChatGPT for Software Developers', href: '#' },
            { name: 'Generative AI for Software Developers - IBM', href: '#' },
            { name: 'Generative AI: Foundation Models and Platforms - IBM', href: '#' },
            { name: 'Generative AI: Business Transformation and Career Growth - IBM', href: '#' },
            { name: 'Introduction to Generative AI Studio', href: '#' },
            { name: 'Samsung AI for Career Growth and in Daily Life', href: '#' },
        ],
    },
    {
        name: 'Business & Finance',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Future Finance', href: '#' },
            { name: 'Digital Finance', href: '#' },
            { name: 'Blockchain', href: '#' },
            { name: 'Risk Management', href: '#' },
            { name: 'Investment', href: '#' },
            { name: 'Master of Business Administration (MBA)', href: '#' },
            { name: 'Financial Management', href: '#' },
            { name: 'Payments', href: '#' },
            { name: 'Business Administration', href: '#' },
            { name: 'Financial Analysis', href: '#' },
            { name: 'Banking', href: '#' },
            { name: 'Social Media Management', href: '#' },
        ],
    },
    {
        name: 'Personal Development',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Life Coaching', href: '#' },
            { name: 'Leadership', href: '#' },
            { name: 'Personal Development', href: '#' },
            { name: 'Mindfulness', href: '#' },
            { name: 'Critical Thinking', href: '#' },
            { name: 'Personal Transformation', href: '#' },
            { name: 'Parenting', href: '#' },
            { name: 'Stress Management', href: '#' },
            { name: 'Meditation', href: '#' },
            { name: 'Communication', href: '#' },
        ],
    },
    {
        name: 'Graphic Design & Illustration',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Graphic Design', href: '#' },
            { name: 'Adobe Photoshop', href: '#' },
            { name: 'Adobe Lightroom', href: '#' },
            { name: 'Adoba Illustrator', href: '#' },
            { name: 'Canva', href: '#' },
            { name: 'Painting', href: '#' },
            { name: 'Adobe InDesign', href: '#' },
            { name: 'Digital Painting', href: '#' },
        ],
    },
    {
        name: 'Digital Marketing',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Digital Marketing and E-Commerce- FBA, Dropshipping, ETS…', href: '#' },
            { name: 'Social Media Marketing -Meta, Instagram Marketing, TikTok Marketing/Shopping & Showcase → Rakip platformlarda yok!!!', href: '#' },
            { name: 'Gemini', href: '#' },
            { name: 'Google Analytics', href: '#' },
            { name: 'Marketing Strategy', href: '#' },
            { name: 'ChatGPT', href: '#' },
            { name: 'Search Engine Optimization (SEO)', href: '#' },
            { name: 'Digital Advertising - Google Ads…', href: '#' },
            { name: 'Email Marketing', href: '#' },
            { name: 'Copywriting', href: '#' },
        ],
    },
    {
        name: 'Arts and Humanities',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Art - Art History, gender and art, society and art…', href: '#' },
            { name: 'History', href: '#' },
            { name: 'Music', href: '#' },
            { name: 'Animation', href: '#' },
            { name: 'Photography', href: '#' },
            { name: 'Psychology- Neuro-Linguistic Programing (NLP), Cognitive Behavioral Therapy, ADHD…', href: '#' },
            { name: 'Mindfulness', href: '#' },
            { name: 'Religions', href: '#' },
            { name: 'Logic', href: '#' },
            { name: 'Meditation', href: '#' },
        ],
    },
    {
        name: 'Health & Fitness',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'General Health', href: '#' },
            { name: 'Sports', href: '#' },
            { name: 'Nutrition & Diet', href: '#' },
            { name: 'Fitness', href: '#' },
            { name: 'Mental Health', href: '#' },
            { name: 'Yoga', href: '#' },
            { name: 'Martial Arts & Self Defense', href: '#' },
            { name: 'Meditation', href: '#' },
            { name: 'Cognitive Behavioral Therapy (CBT)', href: '#' },
            { name: 'Safety & First Aid', href: '#' },
            { name: 'Dance', href: '#' },
            { name: 'Medical', href: '#' },
            { name: 'Medicine', href: '#' },
            { name: 'Massage - Sports Massage', href: '#' },
            { name: 'Spiritual Healing', href: '#' },
        ],
    },
    {
        name: 'Photography & Video',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Photography', href: '#' },
            { name: 'Digital Photography', href: '#' },
            { name: 'Video Editing', href: '#' },
            { name: 'Commercial Photography', href: '#' },
            { name: 'Video Design', href: '#' },
            { name: 'Final Cut Pro X Tutorial', href: '#' },
            { name: 'Stock Photos - Generative AI, Video', href: '#' },
        ],
    },
    {
        name: 'Music',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Instruments', href: '#' },
            { name: 'Music Production', href: '#' },
            { name: 'Music Techniques', href: '#' },
            { name: 'Music Fundamentals', href: '#' },
            { name: 'Music Software', href: '#' },
            { name: 'Vocal', href: '#' },
        ],
    },
    {
        name: 'Academics',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: 'Engineering', href: '#' },
            { name: 'Science', href: '#' },
            { name: 'Test Prep - IELTS, TOEFL, SAT, TEOG-YKS etc.', href: '#' },
            { name: 'Math', href: '#' },
            { name: 'Teacher Training', href: '#' },
            { name: 'Language', href: '#' },
        ],
    },
    {
        name: 'Sustainability',
        href: '#',
        icon: SquaresPlusIcon,
        subcategories: [
            { name: '17 SDGs Goals', href: '#' },
        ],
    },
];


const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ');
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <header className={classNames("sticky top-0 z-50 transition-shadow", isScrolled ? "bg-white/90 backdrop-blur shadow-lg" : "bg-white")}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-1 space-x-4" aria-label="Global">
                <div className="flex shrink-0 font-bold text-3xl lg:flex-1">
                    <Link href="/">
                        <span className="text-orange-400 cursor-pointer">Ce</span>
                    </Link>
                    <Link href="/">
                        <span className="text-orange-400">RR</span>
                    </Link>
                    <Link href="/">
                        <span className="text-orange-400 cursor-pointer">oute</span>
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
                    <Popover>
                        <Popover.Button
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 mt-3"
                        >
                            Categories
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as="div"
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute left-0 top-full z-10 mt-3 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                                style={{ width: '1300px', height: '8000px' }}
                            >
                                <div className="p-4">
                                    <div className="grid grid-cols-6 gap-4">
                                        {categories.map((category) => (
                                            <Disclosure
                                                as="div"
                                                key={category.name}
                                                className="group relative flex flex-col items-start gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                            >
                                                <Disclosure.Button
                                                    className="flex items-center gap-x-6 w-full"
                                                    onClick={() => setSelectedCategory(category.name)}
                                                >
                                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                        <category.icon className="h-6 w-6 text-gray-600 group-hover:text-orange-300" aria-hidden="true" />
                                                    </div>
                                                    <div className="flex-auto">
                                                <span className="block font-semibold text-gray-900">
                                                    {category.name}
                                                </span>
                                                    </div>
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400 group-hover:text-orange-300" />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="pl-11 mt-2 space-y-2">
                                                    {category.subcategories.map((subcategory) => (
                                                        <a
                                                            key={subcategory.name}
                                                            href={subcategory.href}
                                                            className="block text-gray-600 hover:text-gray-900"
                                                        >
                                                            {subcategory.name}
                                                        </a>
                                                    ))}
                                                </Disclosure.Panel>
                                            </Disclosure>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <Popover.Group className="hidden lg:flex space-x-12">
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="block w-full rounded-md border-gray-300 pl-10 pr-80 sm:text-sm"
                                placeholder="Search"
                            />
                        </div>
                    </Popover.Group>
                </Popover.Group>
                <div className="hidden lg:flex items-center space-x-12">
                    <button className="p-4 text-black">
                        <ShoppingCartIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-start space-x-8">
                    <Link href="/signin" className="text-sm font-semibold leading-6 text-white bg-orange-400 rounded-md px-3 py-1">
                        Log In <span aria-hidden="true"></span>
                    </Link>
                    <Link href="/signup" className="text-sm font-semibold leading-6 text-white bg-orange-400 rounded-md px-3 py-1">
                        Sign Up <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                <div className="hidden lg:flex space-x-8">
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
                                    className="absolute left-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...categories, ...callsToAction].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
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
    );
}
