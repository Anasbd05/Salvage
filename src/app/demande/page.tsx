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
import { createClient } from "@/utils/supabase/client";
import { Check, X } from "lucide-react";

const page = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Ville, setVille] = useState("");
  const [Address, setAdress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Service, setService] = useState("");
  const [Category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [Year, setYear] = useState("");
  const [Date, setDate] = useState("");
  const [Heure, setHeure] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const supabase = createClient();
  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!FullName.trim()) newErrors.fullName = "Nom complet requis";
    if (!PhoneNumber.trim()) newErrors.phoneNumber = "Téléphone requis";
    if (!Email.trim()) newErrors.email = "Email requis";
    if (!Ville.trim()) newErrors.ville = "Ville requise";
    if (!Address.trim()) newErrors.address = "Adresse requise";
    if (!Category) newErrors.category = "Choisissez une catégorie";
    if (!brand) newErrors.brand = "Choisissez une marque";
    if (!model.trim()) newErrors.model = "Modèle requis";
    if (!Year.trim()) newErrors.year = "Année requise";
    if (!Service) newErrors.service = "Choisissez un service";
    if (!Date) newErrors.date = "Choisissez une date";
    if (!Heure) newErrors.heure = "Choisissez une heure";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const { error } = await supabase.from("Salvage").insert({
        full_name: FullName,
        email: Email,
        phone_number: PhoneNumber,
        ville: Ville,
        address: Address,
        category: Category,
        brand,
        service: Service,
        date: Date,
        heure: Heure,
      });
      setClose(false);
      if (error) throw error;
    } catch (error) {
      console.log("ERROR:", error);
      alert("Une erreur est survenue ❌");
    }
  };

  const [close, setClose] = useState(true);

  return (
    <section className=" relative min-h-screen bg-linear-to-br from-sky-50 py-10 to-white ">
      <div className=" flex flex-row w-full justify-between px-10 ">
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
      <main className=" flex lg:flex-row flex-col w-full items-start gap-8 px-8 lg:px-14 mt-8 ">
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
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Prénom et nom"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </Field>
              <div className=" flex flex-row gap-4 ">
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    Téléphone
                  </FieldLabel>
                  <Input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    placeholder="06XX XXX XXX"
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    E-mail
                  </FieldLabel>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="votre@email.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
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
                  onChange={(e) => setVille(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  type="text"
                  placeholder="Ex : Casablanca, Rabat..."
                  required
                />
                {errors.ville && (
                  <p className="text-red-500 text-xs mt-1">{errors.ville}</p>
                )}
              </Field>
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Adresse complète
                </FieldLabel>
                <Input
                  onChange={(e) => setAdress(e.target.value)}
                  type="text"
                  placeholder="Rue, numéro, résidence..."
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
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
                <Select onValueChange={(value) => setCategory(value)}>
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
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </Field>
              <Field>
                <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                  Brand
                </FieldLabel>
                <Select onValueChange={(value) => setBrand(value)}>
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
                </Select>
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
                )}
              </Field>
              <div className=" flex flex-row gap-4 ">
                <Field>
                  <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
                    Model
                  </FieldLabel>

                  <Input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className={errors.model ? "border-red-500" : ""}
                    type="text"
                    placeholder="A5"
                  />

                  {errors.model && (
                    <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel className=" -mb-2 text-sm font-medium text-gray-600">
                    year
                  </FieldLabel>
                  <Input
                    value={Year}
                    onChange={(e) => setYear(e.target.value)}
                    className={errors.year ? "border-red-500" : ""}
                    type="number"
                    placeholder="2026"
                  />

                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                  )}
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
                  onClick={() => setService(service.label)}
                  key={index}
                  className={`relative flex flex-col items-start gap-1 p-4 rounded-xl border-2 transition-all cursor-pointer text-left w-full ${
                    Service === service.label
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
            {errors.service && (
              <p className="text-red-500 text-sm mt-2">{errors.service}</p>
            )}
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
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Créneau horaire
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      onClick={() => setHeure(slot)}
                      key={slot}
                      type="button"
                      className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                        slot === Heure && "border-sky-500 bg-sky-50 shadow-sm"
                      } `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.heure && (
                  <p className="text-red-500 text-xs mt-2">{errors.heure}</p>
                )}
              </div>
            </div>
          </div>
        </main>

        <div className=" w-2/3 lg:w-[45%] lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              🧾 Récapitulatif
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Service</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Service}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">
                  Véhicule Category
                </span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Category}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Date</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Date}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Heure</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Heure}
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
              onClick={handleSubmit}
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

      {/* Submit successful */}
      <div
        className={` fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ${
          close === true ? " hidden " : "fixed "
        } `}
      >
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-lg mx-4 text-center">
          {/* Close button */}
          <button
            onClick={() => setClose(true)}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5 cursor-pointer " />
          </button>

          {/* Icon */}
          <div className="mx-auto mt-5 mb-5 w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
            <div className="  w-13 h-13 flex items-center justify-center bg-sky-200 rounded-xl  ">
              <Check className="w-8 h-8 text-sky-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Merci de nous avoir <br className=" lg:flex hidden " />
            <span className="text-emerald-500">Choisis!</span>
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Votre demande a été reçue. Nous vous contacterons par e-mail pour
            confirmer ou refuser votre réservation.
          </p>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200 mb-6" />

          {/* Details summary */}
          <div className="flex flex-col gap-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Service</span>
              <span className="font-medium text-gray-700">
                {Service || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="font-medium text-gray-700">{Date || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Heure</span>
              <span className="font-medium text-gray-700">{Heure || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
