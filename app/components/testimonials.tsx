'use client'

import React, {useEffect, useState} from "react";

const testimonialList = [
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "John Smith",
      position: "CEO & Founder at EasyFrontend",
      content:
          "The learning experience on Cerroute is unparalleled. The instructors are knowledgeable and supportive, and the platform itself is user-friendly. I've gained invaluable skills that have boosted my career.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sara Tailor",
      position: "CEO & Founder at EasyFrontend",
      content:
          "Cerroute has transformed the way I approach learning. The interactive lessons and real-world projects have made complex concepts easy to understand. Highly recommend it!",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "Michael Lee",
      position: "CEO & Founder at EasyFrontend",
      content:
          "I've tried several online learning platforms, but none compare to Cerroute. The quality of instruction, the variety of courses, and the supportive community make it stand out. I'm grateful for the skills I've gained here."
    },
  ],
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "David Brown",
      position: "CEO & Founder at EasyFrontend",
      content:
          "As a busy professional, flexibility is key for me. Cerroute's self-paced courses allow me to learn on my own schedule without sacrificing quality. It's been a game-changer for my career advancement."
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sarah Miller",
      position: "CEO & Founder at EasyFrontend",
      content:
          "I stumbled upon Cerroute while searching for resources to enhance my coding skills. Little did I know that it would become my go-to platform for continuous learning. The instructors are top-notch, and the content is always up-to-date."
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "John Leo",
      position: "CEO & Founder at EasyFrontend",
      content:
          "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It is easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
  ],
];

function ShapeOne() {
  return (
      <svg
          className="absolute bottom-0 left-0 -z-[1]"
          width="404"
          height="572"
          viewBox="0 0 404 572"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"

      >
        <circle
            cx="118"
            cy="286"
            r="265.5"
            stroke="#FAD6A5"
            strokeOpacity="0.2"
            strokeWidth="41"
        />
      </svg>
  );
}

function ShapeTwo() {
  return (
      <svg
          className="absolute top-5 right-0 -z-[1]"
          width="269"
          height="479"
          viewBox="0 0 269 479"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <circle
            cx="239.5"
            cy="239.5"
            r="239.5"
            fill="#FF45001A"
            fillOpacity="1"
        />
      </svg>
  );
}

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex=0) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
          prevIndex === testimonialList.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
      <section className="ezy__testimonial23 light py-14 md:py-8 mb-24 bg-white  text-zinc-900 relative z-[1]">
        <ShapeOne/>
        <ShapeTwo/>
        <div className="container px-4 mx-auto">
          <div className="relative max-w-3xl mx-auto mt-20" data-aos="zoom-y-out">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16 mb-16">
              <h2 className="h2 mb-4">Trusted by people all over the world</h2>
              <p className="text-xl text-gray-600" data-aos="zoom-y-out">Trusted by people worldwide, our platform has
                become the go-to destination for quality education and reliable resources. Join the global community of
                learners who rely on us for their academic and professional growth.</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-3 gap-6">
              {testimonialList[index].map((testimonial, i) => (
                  <div className="col-span-3 lg:col-span-1" key={i}>
                    <div className="bg-white  shadow-2xl h-72 p-6 xl:p-10">
                      <div className="flex items-center mb-6">
                        <div className="mr-3">
                          <img
                              src={testimonial.img}
                              alt={testimonial.name}
                              className="max-w-full h-auto rounded-full border"
                              width="65"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-medium">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm mb-2">{testimonial.position}</p>
                        </div>
                      </div>
                      <p className="opacity-75 mb-2">{testimonial.content}</p>
                    </div>
                  </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 m-0 mt-12">
              {testimonialList.map((item, i) => (
                  <button
                      className={`w-2 h-2 rounded-full ${
                          index === i
                              ? "scale-125 bg-orange-400"
                              : " bg-gray-400 "
                      } `}
                      key={i}
                      onClick={() => handleSelect(i)}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Testimonials;
