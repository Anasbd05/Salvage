"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";
import { reviews } from "@/assets/assets";
import { Quote } from "lucide-react";
import Image from "next/image";

const Reviews = () => {
  return (
    <section id="reviews" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold text-center font-montserrat text-accent">
          Avis clients
        </h1>
        <p className="text-gray-600 text-center mb-4 ">
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
          <SwiperSlide key={review.id} className="w-full px-4 py-8 cursor-grab">
            <div className="flex flex-col bg-white border border-gray-300 rounded-2xl p-10 max-w-2xl mx-auto gap-0">
              {/* Quote icon */}
              <div className="flex flex-row justify-between">
                <Image
                  src={review.image}
                  className="rounded-full h-24 w-24 object-top shrink-0"
                  alt=""
                />
                <Quote className="text-sky-500 w-10 h-10 mb-4" />
              </div>

              <p className="text-base mt-6 leading-relaxed text-neutral-800 italic font-montserrat mb-6">
                {review.comment}
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-5">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-neutral-900 text-[15px]">
                    {review.username}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
