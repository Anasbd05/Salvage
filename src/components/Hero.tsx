import Image from "next/image";
import React from "react";
import hero from "@/assets/hero.png";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col lg:flex-row justify-between w-full items-center gap-10 lg:h-127.5 px-8 py-14 lg:px-20">
      <div className="flex flex-col lg:w-2/4 gap-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight lg:leading-15">
          Redonnez de l’éclat à votre{" "}
          <span className="bg-linear-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
            véhicule
          </span>
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
          Profitez d’un service de lavage automobile professionnel directement
          chez vous. Rapide, pratique et efficace, nous prenons soin de votre
          véhicule pendant que vous profitez de votre temps libre.
        </p>

        <div className="flex gap-4 pt-2">
          <Link
            href="/demande"
            className=" cursor-pointer group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:opacity-80 text-white font-semibold shadow-lg shadow-sky-200 transition-all duration-300"
          >
            Réserver maintenant
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
      <div className="  w-full lg:w-2/5">
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
