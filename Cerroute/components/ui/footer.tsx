import Logo from './logo'
import Link from "next/link";
import About from "@/components/about";

export default function Footer() {
  return (
      <footer>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Top area: Blocks */}
          <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

            {/* 1st block */}
            <div className="sm:col-span-12 lg:col-span-3">
              <div className="shrink-0 mr-4 font-bold text-2xl">
                <Link href="/">
                  <span className="text-ceRRoute cursor-pointer">Ce</span>
                </Link>
                <Link href="/">
                  <span className="text-orange-400">RR</span>
                </Link>
                <Link href="/">
                  <span className="text-ceRRoute cursor-pointer">oute</span>
                </Link>
              </div>
              <div className="text-sm text-gray-600">
                <a href="#0"
                   className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Terms</a> Â· <a
                  href="#0"
                  className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Privacy
                Policy</a>
              </div>
            </div>

            {/* 2nd block */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-gray-800 font-medium mb-2">Courses</h6>
              <ul className="text-sm">
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Software Engineering
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Art & Design</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Computer Science</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Marketing</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Health & Fitness</a>
                </li>
              </ul>
            </div>

            {/* 3rd block */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-gray-800 font-medium mb-2">Resources</h6>
              <ul className="text-sm">
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Documentation</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Tutorials & Guides</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Blog</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Support Center</a>
                </li>
                <li className="mb-2">
                  <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Partners</a>
                </li>
              </ul>
            </div>

            {/* 4th block */}

            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-gray-800 font-medium mb-2">Company</h6>
              <ul className="text-sm">
                <li className="mb-2">
                  <Link href="/">
                    <span className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Home</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about">
                    <span className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">About us</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/PrivacyPolicy">
                    <span className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </div>


            {/* 5th block */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
              <h6 className="text-gray-800 font-medium mb-2">Subscribe</h6>
              <p className="text-sm text-gray-600 mb-4">Get the latest news and articles to your inbox every month.</p>
              <form>
                <div className="flex flex-wrap mb-4">
                  <div className="w-full">
                    <label className="block text-sm sr-only" htmlFor="newsletter">Email</label>
                    <div className="relative flex items-center max-w-xs">
                      <input id="newsletter" type="email" className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm" placeholder="Your email" required />
                      <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                        <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
                        <svg className="w-3 h-3 fill-current text-orange-400 mx-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                        </svg>
                      </button>
                    </div>
                    {/* Success message */}
                    {/* <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p> */}
                  </div>
                </div>
              </form>
            </div>

          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

            {/* Social as */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <a href="#0" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Twitter">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a href="https://www.instagram.com/cerroute/" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="-10 -10 70 70" >
                    <path fill="#555555"
                          d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a href="#0"
                   className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                   aria-label="Facebook">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z"/>

                  </svg>
                </a>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="text-sm text-gray-600 mr-4">&copy; Cerroute.com. All rights reserved.</div>

          </div>

        </div>
      </footer>
  )
}
