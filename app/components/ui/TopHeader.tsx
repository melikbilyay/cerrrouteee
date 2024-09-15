import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function TopHeader() {
    const [isVisible, setIsVisible] = useState(true);
    const pathname = usePathname(); // Get the current path

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`header-font transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-black shadow-md py-2.5 px-4`}>
            <div className="max-w-7xl mx-auto flex p-2 space-x-5">
                <Link href="/">
                    <span
                        className={`text-m font-semibold text-white ${pathname === '/' ? 'border-b-2 border-white' : ''}`}
                    >
                        Individual
                    </span>
                </Link>
                <Link href="/corporate">
                    <span
                        className={`text-m font-semibold text-white ${pathname === '/corporate' ? 'border-b-2 border-white' : ''}`}
                    >
                        Corporate
                    </span>
                </Link>
                <Link href="/instructor">
                    <span
                        className={`text-m font-semibold text-white ${pathname === '/instructor' ? 'border-b-2 border-white' : ''}`}
                    >
                        Instructor
                    </span>
                </Link>
            </div>
        </div>
    );
}
