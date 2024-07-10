

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import FeaturesBg from '@/public/images/features-bg.png'

export default function Features() {

  const [tab, setTab] = useState<number>(1)

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
      <section className="relative">

        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">

            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Benefits of CeRRoute</h1>
              <p className="text-xl text-gray-600">Empowering educators with a comprehensive suite of online tools, our platform revolutionizes the landscape of digital education. From interactive lectures to seamless student management, we offer everything needed to build a dynamic online learning environment.</p>
            </div>

            {/* Section content */}
            <div className="md:grid md:grid-cols-12 md:gap-6">

              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                  <h3 className="h3 mb-3">Powerful suite of tools</h3>
                  <p className="text-xl text-gray-600">Our platform offers a robust toolkit for online education, streamlining the process from lecture creation to student management.</p>
                </div>
                {/* Tabs buttons */}
                <div className="mb-8 md:mb-0">
                  <a
                      className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                      href="#0"
                      onClick={(e) => { e.preventDefault(); setTab(1); }}
                  >
                    <div>
                      <div className="font-bold leading-snug tracking-tight mb-1">Online Courses</div>
                      <div className="text-gray-600">Take collaboration to the next level with security and administrative features built for teams.</div>
                    </div>
                    <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                      </svg>
                    </div>
                  </a>
                  <a
                      className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                      href="#0"
                      onClick={(e) => { e.preventDefault(); setTab(2); }}
                  >
                    <div>
                      <div className="font-bold leading-snug tracking-tight mb-1">Earn A Certificates</div>
                      <div className="text-gray-600">Take collaboration to the next level with security and administrative features built for teams.</div>
                    </div>
                    <div
                        className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path
                            d="M15.463 14.861c-.241.705-.242.569 0 1.277l.037.223c0 .225-.111.441-.308.578-.628.435-.545.325-.781 1.033-.099.295-.385.495-.708.495h-.001c-.774-.003-.64-.044-1.265.395-.129.092-.283.138-.437.138s-.308-.046-.438-.138c-.625-.439-.49-.397-1.265-.395h-.002c-.322 0-.608-.2-.706-.495-.236-.709-.156-.599-.781-1.033-.197-.136-.308-.354-.308-.578l.037-.222c.242-.705.242-.569 0-1.277l-.037-.223c0-.225.111-.441.309-.578.625-.434.544-.324.781-1.033.098-.296.384-.495.706-.495h.002c.772.002.636.047 1.265-.395.129-.092.283-.138.437-.138s.308.046.438.137c.625.439.49.397 1.265.395h.001c.323 0 .609.199.708.495.236.708.153.598.781 1.033.196.137.308.354.308.578l-.038.223zm-1.713.639c0-.966-.783-1.75-1.75-1.75s-1.75.784-1.75 1.75.783 1.75 1.75 1.75 1.75-.784 1.75-1.75zm-3.067 3.966c-.383 0-.686-.037-.937-.107-.154 1.534-.68 2.685-1.746 3.796.428.053.975-.047 1.416-.28.159.318.326.715.384 1.125 1.005-1.149 1.633-2.527 1.867-4.035-.472-.091-.617-.248-.984-.499zm2.634 0c-.368.253-.521.41-.983.499.234 1.508.862 2.886 1.866 4.036.058-.41.225-.807.384-1.125.441.232.988.333 1.416.28-1.064-1.109-1.584-2.266-1.739-3.797-.252.069-.556.107-.944.107zm-11.317-19.466v21h5.154c.337-.535.528-1.104.602-1.841l.015-.159h-3.771v-17h16v17h-3.765l.016.156c.075.742.265 1.312.598 1.844h5.151v-21h-20zm16 5h-12v1h12v-1zm0 2h-12v1h12v-1zm0 2h-12v1h12v-1z"/>
                      </svg>

                    </div>
                  </a>
                  <a
                      className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                      href="#0"
                      onClick={(e) => {
                        e.preventDefault();
                        setTab(3);
                      }}
                  >
                    <div>
                      <div className="font-bold leading-snug tracking-tight mb-1">Learn with Expert</div>
                      <div className="text-gray-600">Take collaboration to the next level with security and administrative
                        features built for teams.
                      </div>
                    </div>
                    <div
                        className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/>
                      </svg>

                    </div>
                  </a>
                </div>
              </div>

              {/* Tabs items */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
                <div className="transition-all">
                  <div className="relative flex flex-col text-center lg:text-right" data-aos="zoom-y-out" ref={tabs}>
                    {/* Item 1 */}
                    <Transition
                        show={tab === 1}
                        appear={true}
                        className="w-full"
                        enter="transition ease-in-out duration-700 transform order-first"
                        enterFrom="opacity-0 translate-y-16"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300 transform absolute"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-16"
                        beforeEnter={() => heightFix()}
                        unmount={false}
                    >
                      <div className="relative inline-flex flex-col">
                        <Image className="md:max-w-none mx-auto rounded" src={FeaturesBg} width={500} height="462" alt="Features bg" />
                      </div>
                    </Transition>
                    {/* Item 2 */}
                    <Transition
                        show={tab === 2}
                        appear={true}
                        className="w-full"
                        enter="transition ease-in-out duration-700 transform order-first"
                        enterFrom="opacity-0 translate-y-16"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300 transform absolute"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-16"
                        beforeEnter={() => heightFix()}
                        unmount={false}
                    >
                      <div className="relative inline-flex flex-col">
                        <Image className="md:max-w-none mx-auto rounded" src={FeaturesBg} width={500} height="462" alt="Features bg" />

                      </div>
                    </Transition>
                    {/* Item 3 */}
                    <Transition
                        show={tab === 3}
                        appear={true}
                        className="w-full"
                        enter="transition ease-in-out duration-700 transform order-first"
                        enterFrom="opacity-0 translate-y-16"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300 transform absolute"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-16"
                        beforeEnter={() => heightFix()}
                        unmount={false}
                    >
                      <div className="relative inline-flex flex-col">
                        <Image className="md:max-w-none mx-auto rounded" src={FeaturesBg} width={500} height="462" alt="Features bg" />
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
  )
}
