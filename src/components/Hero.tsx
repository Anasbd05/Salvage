import Image from "next/image";
import React from "react";
import hero from "@/assets/hero.png";

const Home = () => {
  return (
    <main className="flex justify-between w-full items-center gap-10 h-127.5 px-20">
      <div className="flex flex-col w-2/4 gap-8">
        <h2 className="text-5xl font-bold text-black">
          Professional Cleaning, <br /> Right at Your Doorstep
        </h2>

        <p className="text-gray-900 leading-relaxed">
          Enjoy a spotless vehicle without leaving your home. Our mobile
          cleaning service provides high-quality car washing and detailing,
          saving you time while delivering exceptional results.
        </p>

        <div className="flex gap-5">
          <button className="py-2.5 px-7 rounded-lg bg-blue-500 hover:opacity-80 cursor-pointer text-white">
            Book a Service
          </button>
        </div>
      </div>
      <div className="w-2/5">
        <Image
          alt=""
          className="h-115  w-full rounded-xl "
          src={hero}
          width={500}
          height={400}
        />
      </div>
    </main>
  );
};

export default Home;
