'use client'
import Canvas from "./Canvas";
export default function FeaturesBlocks() {
  return (
      <section className="relative">

        {/* Section background (needs .relative class on parent and next sibling elements) */}

        <div
            className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-6 md:py-20">

            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h2 className="h2 mb-4">Explore the courses</h2>
              <p className="text-xl text-gray-600">Explore our diverse range of expert-led courses, designed to fit your
                schedule and help you gain practical skills for real-world success.</p>
            </div>

            {/* Items */}
            <div
                className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">

              {/* 1st item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2 shimmer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-orange-400" width="64" height="64" rx="32"/>
                    <g strokeWidth="2">
                      <path className="stroke-current text-orange-300"
                            d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"/>
                      <path className="stroke-current text-white" d="M20.571 37.714h5.715L36.57 26.286h8"/>
                      <path className="stroke-current  text-orange-300" strokeLinecap="square"
                            d="M41.143 34.286l3.428 3.428-3.428 3.429"/>
                      <path className="stroke-current text-white" strokeLinecap="square"
                            d="M41.143 29.714l3.428-3.428-3.428-3.429"/>
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Software Engineering</h4>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              {/* 2nd item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2 shimmer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-orange-400" width="64" height="64" rx="32"/>
                    <g strokeWidth="2" transform="translate(19.429 20.571)">
                      <circle className="stroke-current text-white" strokeLinecap="square" cx="12.571" cy="12.571"
                              r="1.143"/>
                      <path className="stroke-current text-white"
                            d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"/>
                      <path className="stroke-current text-orange-300"
                            d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"/>
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Art & Design</h4>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              {/* 3rd item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2 shimmer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-orange-400" width="64" height="64" rx="32"/>
                    <g strokeWidth="2">
                      <path className="stroke-current text-orange-300"
                            d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"/>
                      <path className="stroke-current text-white" strokeLinecap="square"
                            d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"/>
                      <path className="stroke-current text-orange-300" d="M36.571 32H40"/>
                      <path className="stroke-current text-white" d="M24 32h3.429" strokeLinecap="square"/>
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Computer Science</h4>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              {/* 4th item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2 shimmer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-orange-400" width="64" height="64" rx="32"/>
                    <g strokeWidth="2">
                      <path className="stroke-current text-white"
                            d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"/>
                      <path className="stroke-current text-white"
                            d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"/>
                      <path className="stroke-current text-white"
                            d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"/>
                      <path className="stroke-current text-orange-300"
                            d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                            strokeLinecap="square"/>
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Data Science</h4>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              {/* 5th item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2 shimmer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-orange-400" width="64" height="64" rx="32"/>
                    <g strokeWidth="2" transform="translate(20.571 20.571)">
                      <path className="stroke-current text-white"
                            d="M21.714 12.571c0-5.057-4.1-9.143-9.143-9.143-5.056 0-9.143 4.086-9.143 9.143 0 4.57 3.288 8.377 7.715 9.014v3.372h2.857v-3.372c4.427-.637 7.714-4.444 7.714-9.014z"/>
                      <path className="stroke-current text-orange-300"
                            d="M18.857 12.571a6.286 6.286 0 00-6.286-6.286 6.286 6.286 0 00-6.286 6.286"
                            strokeLinecap="square"/>
                      <path className="stroke-current text-white" d="M10.286 17.143h4.572v2.857h-4.572z"/>
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Cyber Security</h4>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

              {/* 6th item */}
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2 shimmer" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-orange-400" width="64" height="64" rx="32"/>
                    <g strokeWidth="2">
                      <path className="stroke-current text-white"
                            d="M21.333 28h7.111l2.845 2.844a4 4 0 002.829 1.172h3.982M42.667 36V20.89C42.667 19.847 41.82 19 40.778 19H23.111c-1.043 0-1.889.847-1.889 1.889v10.222"/>
                      <path className="stroke-current text-orange-300"
                            d="M26 25h12M26 29h5.333"
                            strokeLinecap="square"/>
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Cloud Computing</h4>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>

            </div>

          </div>
        </div>
      </section>
  )
}
