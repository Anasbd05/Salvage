/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { carBrands, services, vehiculeCategories } from "@/assets/assets";
import Link from "next/link";
import React, { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  const [selected, setSelected] = useState("");
  const TIME_SLOTS = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <section className="min-h-screen bg-linear-to-br from-sky-50 pb-14 to-white ">
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
      <main className=" flex flex-row w-full items-start gap-8 px-14 mt-8 ">
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
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

          {/*  Vehicule Details */}

          <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className=" flex flex-row gap-4 ">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                3
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1 flex items-center">
                  Véhicule Details
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-">
                  Le tarif varie selon la taille du véhicule
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-5 ">
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Category
                </FieldLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {vehiculeCategories.map((carCategory, index) => (
                        <SelectItem key={index} value={carCategory.name}>
                          {carCategory.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Brand
                </FieldLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Brands</SelectLabel>
                      {carBrands.map((carBrand, index) => (
                        <SelectItem key={index} value={carBrand.name}>
                          {carBrand.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>{" "}
              </Field>
              <div className=" flex flex-row gap-4 ">
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    Model
                  </FieldLabel>
                  <Input type="tel" placeholder="A5" required />
                </Field>
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    year
                  </FieldLabel>
                  <Input type="numeric" placeholder="2026" required />
                </Field>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className=" flex flex-row gap-4 ">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                4
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

          {/* Date */}
          <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className=" flex flex-row gap-4 ">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                5
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1 flex items-center">
                  Date et créneau horaire
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-">
                  Disponible du lundi au dimanche
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Créneau horaire
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`py-2 rounded-lg text-sm font-medium border transition-all `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="w-[45%] lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              🧾 Récapitulatif
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Service</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  Lavage extérieur
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">
                  Véhicule Category
                </span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  4X4
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Date</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  18-06-2025
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Heure</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  11:00
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">Total estimé</span>
                <span className="font-extrabold text-sky-600 text-2xl">
                  200 MAD
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                Prix final confirmé sur place
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-base shadow-lg shadow-sky-200 flex items-center justify-center gap-2"
            >
              🚗 Réserver maintenant
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Paiement après le service · Annulation gratuite
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default page;
