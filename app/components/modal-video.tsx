'use client'

import { useState, useRef, Fragment } from 'react'
import type { StaticImageData } from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import hero2 from '@/public/images/hero2.webp'
interface ModalVideoProps {
    thumb: StaticImageData
    thumbWidth: number
    thumbHeight: number
    thumbAlt: string
    video: string
    videoWidth: number
    videoHeight: number
}

export default function ModalVideo({
                                       thumb,
                                       thumbWidth,
                                       thumbHeight,
                                       thumbAlt,
                                       video,
                                       videoWidth,
                                       videoHeight,
                                   }: ModalVideoProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    return (
        <div>

            {/* Video thumbnail */}
            <div>
                <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                    <div className="flex flex-col justify-center">
                        <Image src={hero2} width={thumbWidth} height={thumbHeight} alt={thumbAlt} />
                        <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto" width="768" height="432" viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        </svg>
                    </div>
                    <button className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg" onClick={() => { setModalOpen(true) }}>
                        <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-orange-400 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                            <path d="M10 17l6-5-6-5z" />
                        </svg>
                        <span className="ml-3">Watch the full video (2 min)</span>
                    </button>
                </div>
            </div>
            {/* End: Video thumbnail */}

            <Transition show={modalOpen} as={Fragment} afterEnter={() => videoRef.current?.play()}>
                <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>

                    {/* Modal backdrop */}
                    <Transition.Child
                        as="div"
                        className="fixed inset-0 z-[99999] bg-black bg-opacity-75 transition-opacity"
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    />

                    {/* Modal dialog */}
                    <Transition.Child
                        as="div"
                        className="fixed inset-0 z-[99999] flex items-center justify-center"
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel className="w-full max-w-3xl bg-black rounded-lg overflow-hidden">
                            <video ref={videoRef} width={videoWidth} height={videoHeight} loop controls>
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Dialog.Panel>
                    </Transition.Child>
                    {/* End: Modal dialog */}

                </Dialog>
            </Transition>

        </div>
    )
}
