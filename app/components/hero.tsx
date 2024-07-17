import VideoThumb from '/public/images/hero-image.png';
import ModalVideo from '../components/modal-video';
import Voice from '../components/voice';

export default function Hero() {
  return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="pt-20 pb-12 md:pt-20 md:pb-20">
            {/* Section header */}
            <div className="text-center pb-12 md:pb-16">
              <h1 className="text-6xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4"
                  data-aos="zoom-y-out">Your future your <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-300">Route</span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Join our vibrant
                  community of learners, educators, and professionals from around the globe. Connect with like-minded
                  individuals, share insights and experiences, and embark on a journey of discovery together.</p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out"
                     data-aos-delay="300">
                  <div>
                    <a className="btn text-white bg-orange-400 hover:bg-orange-300 w-full mb-4 sm:w-auto sm:mb-0"
                       href="/courses">Get start now</a>
                  </div>
                  <div>
                    <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn
                      more</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <ModalVideo
                thumb={VideoThumb}
                thumbWidth={768}
                thumbHeight={432}
                thumbAlt="Modal video thumbnail"
                video="/videos/video.mp4"
                videoWidth={1920}
                videoHeight={1080}/>

          </div>
        </div>
        <Voice />
      </section>
  );
}
