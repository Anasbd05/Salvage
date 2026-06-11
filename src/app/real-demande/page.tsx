/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { services } from "@/assets/assets";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [selected, setSelected] = useState("");

  console.log(selected);

  return (
    <section className="min-h-screen bg-linear-to-br from-sky-50 to-white ">
      <div className=" flex flex-row w-full justify-between px-10 py-10 ">
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          ← Retour
        </Link>
        <h2 className=" text-xl font-semibold text-nature ">
          Réservez votre lavage à domicile
        </h2>
      </div>
      <main className=" flex flex-row w-full items-center px-16 mt-8 ">
        <div className=" w-4/6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className=" flex flex-row gap-4 ">
            <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <h2 className="font-bold text-gray-800 mb-1 flex items-center">
                Choisissez votre service
              </h2>
              <p className="text-gray-400 text-sm mb-4 ml-">
                Sélectionnez la prestation qui correspond à vos besoins
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-4 w-full ">
            {services.map((service, index) => (
              <div
                onClick={() => setSelected(service.label)}
                key={index}
                className={`relative flex flex-col items-start gap-1 p-4 rounded-xl border-2 transition-all cursor-pointer text-left w-full ${
                  selected === service.label
                    ? "border-sky-500 bg-sky-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-sky-300 hover:bg-sky-50/40"
                }`}
              >
                <span className="text-2xl"> {service.icon} </span>
                <h2 className="font-semibold text-gray-800 text-sm">
                  {service.label}
                </h2>
                <p className="text-sky-600 font-bold text-sm">
                  À partir de {service.price} MAD
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-2/6 "></div>
      </main>
    </section>
  );
};

export default page;
