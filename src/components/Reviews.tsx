"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";
import { reviews } from "@/assets/assets";
import { Quote } from "lucide-react";

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 bg-white lg:px-0"
    >
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold text-center font-montserrat text-accent">
          Clients Reviews
        </h1>
        <p className="text-gray-600">
          Apprécié par des centaines de clients pour un lavage à domicile
          rapide, pratique et professionnel.
        </p>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        rewind={true}
        loop={true}
        centeredSlides
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="max-w-135 sm:max-w-150 md:max-w-187.5 lg:max-w-225 xl:max-w-5xl"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="w-full bd-gray-50   px-4 py-8 cursor-grab"
          >
            <div className="flex flex-col px-10 py-14 justify-between rounded-xl border-2 border-gray-100 bg-white  gap-4">
              <Quote className="text-sky-600 w-10 h-10 mb-5 " />
              <p className="text-lg font-semibold font-montserrat text-neutral-600">
                {review.comment}
              </p>
              <h1 className="place-self-end text-sm mt-5 ">
                {review.username}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
