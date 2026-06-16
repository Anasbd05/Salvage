"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const SliderUs = () => {
  const Images = [
    "/client.jpg",
    "/team.png",
    "/time.jpg",
    "/produits.jpg",
    "/manwash.jpg",
  ];

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="w-full max-w-97.5 md:max-w-195"
    >
      {Images.map((image, index) => (
        <SwiperSlide
          key={index}
          className="relative w-full px-4 py-8  cursor-grab"
        >
          <Image
            key={index}
            src={image}
            alt=""
            width={500}
            height={500}
            className="w-full h-75 md:h-125 lg:h-112.5 rounded-sm object-cover "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderUs;
