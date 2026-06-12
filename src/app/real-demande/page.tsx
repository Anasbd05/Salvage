/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { services } from "@/assets/assets";
import Link from "next/link";
import React, { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        <main className=" flex w-full flex-col gap-4">
          {/* client name  */}
          <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className=" flex flex-row gap-4 ">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1 flex items-center">
                  Vos coordonnées
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-">
                  Pour confirmer et organiser votre rendez-vous
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-5 ">
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Nom complet
                </FieldLabel>
                <Input placeholder="Prénom et nom" required />
              </Field>
              <div className=" flex flex-row gap-4 ">
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    Téléphone
                  </FieldLabel>
                  <Input type="tel" placeholder="06XX XXX XXX" required />
                </Field>
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    E-mail
                  </FieldLabel>
                  <Input type="email" placeholder="votre@email.com" required />
                </Field>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className=" flex flex-row gap-4 ">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                2
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1 flex items-center">
                  Adresse d&lsquo;intervention
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-">
                  Où souhaitez-vous que nous intervenions ?
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-5 ">
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Ville
                </FieldLabel>
                <Input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder="Ex : Casablanca, Rabat..."
                  required
                />
              </Field>
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Adresse complète
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="Rue, numéro, résidence..."
                  required
                />
              </Field>
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Instructions supplémentaires{" "}
                  <span className="text-gray-400 font-normal">(optionnel)</span>{" "}
                </FieldLabel>
                <Textarea
                  placeholder="Ex : Code d'accès, interphone, parking disponible..."
                  required
                />
              </Field>
            </div>
          </div>

          {/* Services */}
          <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className=" flex flex-row gap-4 ">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                3
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
        </main>
        <div className=" w-2/6 "></div>
      </main>
    </section>
  );
};

export default page;
