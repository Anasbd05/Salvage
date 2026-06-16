"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { howWorks } from "@/assets/assets";

const SliderWorks = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      rewind={true}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      }}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full max-w-[390px] md:max-w-[780px]"
    >
      {howWorks.map((item, index) => (
        <SwiperSlide
          key={index}
          className="relative w-full px-4 py-8 flex flex-col gap-4 items-end cursor-grab"
        >
          <span className="absolute -top-4 right-4 w-14 h-14 bg-white text-accent shadow-lg rounded-full flex items-center justify-center font-bold text-xl">
            {item.id}
          </span>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold font-montserrat">
              {item.title}
            </h2>
            <p className="text-neutral-600 transition-transform duration-500 hover:translate-x-1">
              {item.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderWorks;
