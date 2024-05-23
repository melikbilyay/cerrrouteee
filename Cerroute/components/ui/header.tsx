'use client'

import {useState, useEffect} from 'react';
import Link from 'next/link';
import Logo from './logo';
import Dropdown from '@/components/utils/dropdown';
import MobileMenu from './mobile-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faSearch, faGlobe } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<number>(0);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Sayfa aÅaÄÄ± kaydÄ±rÄ±ldÄ±ÄÄ±nda algÄ±la
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    // TarayÄ±cÄ± boyutu deÄiÅtiÄinde kontrol et
    const resizeHandler = () => {
      setIsMobileView(window.innerWidth <= 894); // ÃrneÄin, 768px'den daha kÃ¼Ã§Ã¼kse mobil gÃ¶rÃ¼nÃ¼me geÃ§iÅ yap
    };

    resizeHandler(); // Sayfa yÃ¼klendiÄinde kontrol et
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };

  }, [top]);

  return (
      <header
          className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Site markasÄ± */}
            <div className="shrink-0 mr-14 font-bold text-3xl left-align">
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

            {/* Kategori menÃ¼sÃ¼ */}
            <nav className="hidden md:flex md:grow">
              <ul className="flex justify-start mr- items-center space-x-6">
                <li className="relative">
                  <button onClick={toggleDropdown} className="flex items-center">
                    <span className="mr-1">Categories</span>
                    <FontAwesomeIcon icon={faChevronDown}/>
                  </button>
                  {isDropdownOpen && (
                      <ul className="absolute top-full left- mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <li><Link href="/VideoList">Computer Science</Link></li>
                        <li><Link href="/VideoList">Software Engineering</Link></li>
                        <li><Link href="/VideoList">Art & Design</Link></li>
                        <li><Link href="/VideoList">Marketing</Link></li>
                        <li><Link href="/VideoList">Music</Link></li>
                        <li><Link href="/VideoList">Health & Fitness</Link></li>
                      </ul>
                  )}
                </li>
              </ul>
            </nav>

            {/* Arama Ã§ubuÄu */}
            <div className="relative flex items-center">
              <input
                  id="searchBar"
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 border border-gray-300 px-25 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                  style={{width: '500px'}}
              />
              <button
                  onClick={() => {
                    const searchBar = document.getElementById('searchBar');
                    if (searchBar) {
                      searchBar.focus();
                    }
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faSearch}/>
              </button>
            </div>

            <div className="flex-grow"></div>

            {/* BoÅluk bÄ±rakmak iÃ§in */}
            <div className="flex items-center justify-end space-x-4">
              {/* AlÄ±ÅveriÅ Sepeti */}
              <Link href="/cart" className={`flex items-center ${isMobileView ? 'hidden' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101"
                     className="h-7 w-7 text-gray-600 hover:text-gray-900" fill="currentColor">
                  <path
                      d="M84.1 28.5c-.5-.6-1.2-.9-1.9-.9h-61v-8.8c0-1.3-1.1-2.4-2.4-2.4-1.3 0-2.4 1.1-2.4 2.4v50c0 1.3 1.1 2.4 2.4 2.4h2.8c-1.9 3.5-1.5 7.9 1.5 10.9 1.7 1.7 4 2.7 6.4 2.7s4.7-.9 6.4-2.7c1.7-1.7 2.7-4 2.7-6.4 0-1.6-.4-3.1-1.2-4.4h11.3c-1.9 3.5-1.5 7.9 1.5 10.9 1.7 1.7 4 2.7 6.4 2.7 2.4 0 4.7-.9 6.4-2.7 1.7-1.7 2.7-4 2.7-6.4 0-1.6-.4-3.1-1.2-4.4h3.1c1.3 0 2.4-1.1 2.4-2.4 0-1.3-1.1-2.4-2.4-2.4H21.2v-4.7h53c1.1 0 2-.7 2.3-1.8l8-29.3c.2-1 0-1.7-.4-2.3zM32.6 78.6c-1.6 1.6-4.5 1.6-6.1 0-1.7-1.7-1.7-4.4 0-6.1.8-.8 1.9-1.3 3.1-1.3 1.2 0 2.2.4 3.1 1.3.8.8 1.3 1.9 1.3 3.1s-.5 2.2-1.4 3zm27.2 0c-1.6 1.6-4.5 1.6-6.1 0-1.7-1.7-1.7-4.4 0-6.1.8-.8 1.9-1.3 3.1-1.3 1.2 0 2.2.4 3.1 1.3.8.8 1.3 1.9 1.3 3.1s-.5 2.2-1.4 3zm12.5-21.8H21.2V32.3H79l-6.7 24.5z"></path>
                </svg>

                <span className="ml-1 text-sm text-gray-600">{cartItems}</span>
              </Link>

              {/* Sign in ve Sign up */}
              <Link href="/signin"
                    className={`font-medium text-gray-600 hover:text-gray-900 px-7 py-3 flex items-center transition duration-150 ease-in-out ${isMobileView ? 'hidden' : ''}`}>Log
                In</Link>
              <Link href="/signup"
                    className={`btn-sm text-white bg-orange-400 ml-4 hover:bg-orange-300 ${isMobileView ? 'hidden' : ''}`}>
                <span>Sign Up</span>
                <svg className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1" viewBox="0 0 12 12"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"/>
                </svg>
              </Link>

              <div className="relative">
                <button onClick={toggleLanguageDropdown} className="absolute  mt-[-12px] left-8 flex items-center">
                  <FontAwesomeIcon icon={faGlobe} className="text-gray-600" style={{ fontSize: '1.5em' }} />
                </button>
                {isLanguageDropdownOpen && (
                    <ul className="absolute top-full left-1 mt-5 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <li>
                        <button onClick={toggleLanguageDropdown}
                                className="text-gray-800 hover:text-orange-400 py-2 px-4 block whitespace-no-wrap">English
                        </button>
                      </li>
                      <li>
                        <button onClick={toggleLanguageDropdown}
                                className="text-gray-800 hover:text-orange-400 py-2 px-4 block whitespace-no-wrap">Turkish
                        </button>
                      </li>
                      <li>
                        <button onClick={toggleLanguageDropdown}
                                className="text-gray-800 hover:text-orange-400 py-2 px-4 block whitespace-no-wrap">Spanish
                        </button>
                      </li>
                      <li>
                        <button onClick={toggleLanguageDropdown}
                                className="text-gray-800 hover:text-orange-400 py-2 px-4 block whitespace-no-wrap">French
                        </button>
                      </li>
                      {/* Add more languages as needed */}
                    </ul>
                )}
              </div>
            </div>


            {isMobileView && <MobileMenu/>}
          </div>
        </div>
      </header>
  );
}
