"use client";
import React from "react";
import { workImages } from "@/assets/assets";
import Image from "next/image";

const Works = () => {
  return (
    <section id="Works" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 ">
      <div className=" flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold text-center font-montserrat text-accent">
          Nos Travaux
        </h1>
        <p className=" text-gray-600 max-w-2xl text-center mt-4 px-6">
          Voyez par vous-même la différence. Grâce à notre service de lavage à
          domicile, nous redonnons à chaque véhicule une apparence propre,
          brillante et soignée.
        </p>
      </div>
      <main className=" grid px-8 mt-10 grid-cols-3 gap-10 w-full ">
        {workImages.map((work, index) => (
          <figure
            key={index}
            className="diff aspect-auto relative"
            tabIndex={0}
          >
            {/* Labels positioned on the figure, above the diff items */}
            <span className="text-xs absolute left-2 top-2 bg-white/60 px-1 rounded z-10 pointer-events-none">
              Avant
            </span>
            <span className="text-xs absolute right-2 top-2 bg-white/60 px-1 rounded z-10 pointer-events-none">
              Après
            </span>

            <div className="diff-item-1 h-80" role="img" tabIndex={0}>
              <Image className="h-full" alt={work.alt} src={work.before} />
            </div>
            <div className="diff-item-2" role="img">
              <Image className="h-full" alt={work.alt} src={work.After} />
            </div>
            <div className="diff-resizer"></div>
          </figure>
        ))}
      </main>
    </section>
  );
};

export default Works;
