export const metadata = {
  title: 'Sign In - Simple',
  description: 'Page description',
}

import Link from 'next/link'

export default function SignIn() {
  return (
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">Welcome back</h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      <Link href="/reset-password" className="text-sm font-medium text-orange-400 hover:underline">Having trouble signing in?</Link>
                    </div>
                    <input id="password" type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="text-gray-600 ml-2">Keep me signed in</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-orange-400 hover:bg-orange-300 w-full">Sign in</button>
                  </div>
                </div>
              </form>
              <div className="flex items-center my-6">
                <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
                <div className="text-gray-600 italic">Or</div>
                <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
              </div>
              <form>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <button
                        className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                      <svg className="w-8 h-8 fill-current text-white opacity-75 shrink-0 mx-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z"/>
                      </svg>
                      <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Facebook</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button
                        className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                      <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-600 text-center mt-6">
                Don't you have an account? <Link href="/signup" className="text-orange-400 hover:underline transition duration-150 ease-in-out">Sign up</Link>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}
