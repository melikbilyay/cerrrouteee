import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TopHeader() {
    const [isVisible, setIsVisible] = useState(true);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        const updatePathname = () => setPathname(window.location.pathname);

        // Initial pathname set
        updatePathname();

        // Scroll event listener to show/hide the header
        const handleScroll = () => {
            setIsVisible(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('popstate', updatePathname);

        // Clean up event listeners
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('popstate', updatePathname);
        };
    }, []);

    // Function to handle link clicks and update pathname
    const handleLinkClick = (path:any) => {
        setPathname(path);
    };

    return (
        <div className={`header-font transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-black shadow-md py-2 px-4`}>
            <div className="max-w-7xl mx-auto flex p-2 space-x-5">
                <Link href="/">
                    <span
                        className={`text-m font-semibold text-white ${pathname === '/' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleLinkClick('/')}
                    >
                        Bireysel
                    </span>
                </Link>
                <Link href="/kurumsal">
                    <span
                        className={`text-m font-semibold text-white ${pathname === '/kurumsal' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleLinkClick('/kurumsal')}
                    >
                        Kurumsal
                    </span>
                </Link>
            </div>
        </div>
    );
}

