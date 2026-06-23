/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { carBrands, services, vehiculeCategories } from "@/assets/assets";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
import { ArrowLeft, Car, Check, LoaderCircle, X } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [total, setTotal] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [surcharge, setSurcharge] = useState(0);

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

  // --- Dynamic Pricing Logic ---
  const calculateTotal = (
    selectedService: string,
    selectedCategory: string
  ) => {
    const found = services.find((s) => s.label === selectedService);
    const base = found ? found.price : 0;

    let extra = 0;
    if (selectedCategory === "SUV_4x4" || selectedCategory === "Utilitaire") {
      extra = 30;
    } else if (selectedCategory === "Pickup") {
      extra = 50;
    }

    return { base, extra, total: base + extra };
  };

  useEffect(() => {
    const { base, extra, total } = calculateTotal(Service, Category);
    setServicePrice(base);
    setSurcharge(extra);
    setTotal(total);
  }, [Service, Category]);
  // --- End Dynamic Pricing Logic ---

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
    setLoading(true);

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
        total,
      });
      setClose(false);
      if (error) throw error;
    } catch (error) {
      console.log("ERROR:", error);
      alert("Une erreur est survenue ❌");
    } finally {
      setLoading(false);
    }
  };

  const [close, setClose] = useState(true);

  return (
    <section className="relative min-h-screen bg-linear-to-br from-sky-50 py-10 to-white">
      <div className="flex flex-row w-full items-center justify-between px-8 py-3 pb-7 border-b  relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 px-3.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-800 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
            <Car className="w-4 h-4 text-sky-600" />
          </div>
          <h2 className="text-sm font-semibold text-gray-800">
            Réservez votre lavage à domicile
          </h2>
        </div>
      </div>

      <main className="flex lg:flex-row flex-col w-full items-start gap-8 px-8 lg:px-14 mt-8">
        <main className="flex w-full flex-col gap-4">
          {/* Client name */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-row gap-4">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1 flex items-center">
                  Vos coordonnées
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Pour confirmer et organiser votre rendez-vous
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Field>
                <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
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
              <div className="flex flex-row gap-4">
                <Field>
                  <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
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
                  <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-row gap-4">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                2
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1">
                  Adresse d&lsquo;intervention
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Où souhaitez-vous que nous intervenions ?
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Field>
                <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
                  Ville
                </FieldLabel>
                <Input
                  onChange={(e) => setVille(e.target.value)}
                  type="text"
                  placeholder="Ex : Casablanca, Rabat..."
                  required
                />
                {errors.ville && (
                  <p className="text-red-500 text-xs mt-1">{errors.ville}</p>
                )}
              </Field>
              <Field>
                <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
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
                <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
                  Instructions supplémentaires{" "}
                  <span className="text-gray-400 font-normal">(optionnel)</span>
                </FieldLabel>
                <Textarea placeholder="Ex : Code d'accès, interphone, parking disponible..." />
              </Field>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-row gap-4">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                3
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1">
                  Véhicule Details
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Le tarif varie selon la taille du véhicule
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Field>
                <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
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
                <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
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
              <div className="flex flex-row gap-4">
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
                  <FieldLabel className="-mb-2 text-sm font-medium text-gray-600">
                    Year
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-row gap-4">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                4
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1">
                  Choisissez votre service
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Sélectionnez la prestation qui correspond à vos besoins
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
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
                  <span className="text-2xl">{service.icon}</span>
                  <h2 className="font-semibold text-gray-800 text-sm">
                    {service.label}
                  </h2>
                  <p className="text-sky-600 font-bold text-sm">
                    À partir de {service.price} DH
                  </p>
                </div>
              ))}
            </div>
            {errors.service && (
              <p className="text-red-500 text-sm mt-2">{errors.service}</p>
            )}
          </div>

          {/* Date */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-row gap-4">
              <span className="w-7 h-7 bg-sky-100 text-blue-700 rounded-lg text-sm flex items-center justify-center font-bold">
                5
              </span>
              <div>
                <h2 className="font-bold text-gray-800 mb-1">
                  Date et créneau horaire
                </h2>
                <p className="text-gray-400 text-sm mb-4">
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
                        slot === Heure
                          ? "border-sky-500 bg-sky-50 shadow-sm text-sky-700"
                          : "border-gray-200 hover:border-sky-300"
                      }`}
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

        {/* Sidebar Summary Card */}
        <div className="w-2/3 lg:w-[45%] lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              🧾 Récapitulatif
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Service</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Service || "—"}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">
                  Catégorie véhicule
                </span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Category || "—"}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Date</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Date || "—"}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-400 shrink-0">Heure</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {Heure || "—"}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">Total estimé</span>
                <span className="font-extrabold text-sky-600 text-2xl">
                  {total > 0 ? `${total} DH` : "— DH"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                Prix final confirmé sur place
              </p>
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-base shadow-lg shadow-sky-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>🚗 Réserver maintenant</>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Paiement après le service · Annulation gratuite
            </p>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ${
          close === true ? "hidden" : "fixed"
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-lg mx-4 text-center">
          <button
            onClick={() => setClose(true)}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
          <div className="mx-auto mt-5 mb-5 w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
            <div className="w-13 h-13 flex items-center justify-center bg-sky-200 rounded-xl">
              <Check className="w-8 h-8 text-sky-600" />
            </div>
          </div>
          <h2 className="text-3xl leading-relaxed font-bold text-gray-800 mb-4">
            Merci de nous avoir <br className="lg:flex hidden" />
            <span className="text-emerald-500">Choisis!</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Votre demande a été reçue. Nous vous contacterons par e-mail pour
            confirmer ou refuser votre réservation.
          </p>
          <div className="border-t border-dashed border-gray-200 mb-6" />
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
            <div className="flex justify-between border-t border-dashed border-gray-100 pt-2 mt-1">
              <span className="text-gray-400 font-semibold">Total</span>
              <span className="font-bold text-sky-600">
                {total > 0 ? `${total} DH` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
