"use client";

import { useState, useEffect } from "react";

// ─── Zod-like validation ───────────────────────────────────────────────────
const validate = (data) => {
  const errors = {};
  if (!data.service) errors.service = "Veuillez sélectionner un service.";
  if (!data.vehicleType)
    errors.vehicleType = "Veuillez sélectionner un type de véhicule.";
  if (!data.date) errors.date = "Veuillez choisir une date.";
  if (!data.timeSlot) errors.timeSlot = "Veuillez choisir un créneau horaire.";
  if (!data.city?.trim()) errors.city = "La ville est requise.";
  if (!data.address?.trim()) errors.address = "L'adresse complète est requise.";
  if (!data.name?.trim()) errors.name = "Le nom complet est requis.";
  if (!data.phone?.trim()) errors.phone = "Le numéro de téléphone est requis.";
  else if (!/^[\d\s\+\-]{8,15}$/.test(data.phone.trim()))
    errors.phone = "Numéro invalide.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Adresse e-mail invalide.";
  return errors;
};

// ─── Pricing ──────────────────────────────────────────────────────────────
const BASE_PRICES = {
  exterior: { label: "Lavage extérieur", price: 120 },
  interior: { label: "Lavage intérieur", price: 150 },
  complete: { label: "Lavage complet", price: 250 },
  premium: { label: "Premium detailing", price: 450 },
};

const VEHICLE_MULTIPLIERS = {
  small: { label: "Petite voiture", mult: 1.0 },
  sedan: { label: "Berline", mult: 1.1 },
  suv: { label: "SUV", mult: 1.25 },
  van: { label: "Utilitaire", mult: 1.4 },
};

const EXTRA_PRICES = {
  tires: { label: "Nettoyage des pneus", price: 40 },
  wax: { label: "Protection cire", price: 60 },
  engine: { label: "Nettoyage moteur", price: 80 },
  seats: { label: "Nettoyage approfondi des sièges", price: 90 },
};

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

function computeTotal(data) {
  const base = BASE_PRICES[data.service]?.price || 0;
  const mult = VEHICLE_MULTIPLIERS[data.vehicleType]?.mult || 1;
  const extras = (data.extras || []).reduce(
    (sum, k) => sum + (EXTRA_PRICES[k]?.price || 0),
    0
  );
  return Math.round(base * mult + extras);
}

// ─── Sub-components ────────────────────────────────────────────────────────

function ServiceCard({ id, label, price, selected, onClick }) {
  const icons = {
    exterior: "🚿",
    interior: "🛋️",
    complete: "✨",
    premium: "💎",
  };
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`relative flex flex-col items-start gap-1 p-4 rounded-xl border-2 transition-all cursor-pointer text-left w-full ${
        selected
          ? "border-green-500 bg-green-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/40"
      }`}
    >
      {id === "complete" && (
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          Populaire
        </span>
      )}
      <span className="text-2xl">{icons[id]}</span>
      <span className="font-semibold text-gray-800 text-sm">{label}</span>
      <span className="text-green-600 font-bold text-sm">
        À partir de {price} MAD
      </span>
    </button>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      ⚠️ {msg}
    </p>
  );
}

function StarRating({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function TrustCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ReviewCard({ name, location, text, rating }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <StarRating n={rating} />
      <p className="text-gray-600 text-sm leading-relaxed italic">"{text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left gap-4 hover:text-green-600 transition-colors"
      >
        <span className="font-medium text-gray-800">{q}</span>
        <span
          className={`text-green-500 text-xl transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-4 text-gray-500 text-sm leading-relaxed pl-0">{a}</p>
      )}
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────
function SuccessScreen({ data, total, onReset }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Réservation confirmée !
        </h2>
        <p className="text-gray-500 mb-8">
          Merci {data.name.split(" ")[0]} ! Votre réservation a bien été
          enregistrée. Vous recevrez une confirmation par SMS.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Service</span>
            <span className="font-semibold text-gray-800">
              {BASE_PRICES[data.service]?.label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Véhicule</span>
            <span className="font-semibold text-gray-800">
              {VEHICLE_MULTIPLIERS[data.vehicleType]?.label}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date & heure</span>
            <span className="font-semibold text-gray-800">
              {data.date} à {data.timeSlot}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Adresse</span>
            <span className="font-semibold text-gray-800 text-right max-w-[180px]">
              {data.address}, {data.city}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-green-600 text-lg">
              {total} MAD
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Nouvelle réservation
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [form, setForm] = useState({
    service: "",
    vehicleType: "",
    date: "",
    timeSlot: "",
    city: "",
    address: "",
    instructions: "",
    name: "",
    phone: "",
    email: "",
    extras: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(computeTotal(form));
  }, [form.service, form.vehicleType, form.extras]);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const toggleExtra = (key) =>
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(key)
        ? prev.extras.filter((e) => e !== key)
        : [...prev.extras, key],
    }));

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  };

  if (success)
    return (
      <SuccessScreen
        data={form}
        total={total}
        onReset={() => {
          setForm({
            service: "",
            vehicleType: "",
            date: "",
            timeSlot: "",
            city: "",
            address: "",
            instructions: "",
            name: "",
            phone: "",
            email: "",
            extras: [],
          });
          setSuccess(false);
        }}
      />
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── NAV ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h2l3 3v4h-2m-3-4v4M9 17H7m10 0h-4m4 0a2 2 0 100-4 2 2 0 000 4zM7 17a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-lg">
              Lavage<span className="text-green-500">+</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a
              href="#booking"
              className="hover:text-green-600 transition-colors"
            >
              Réserver
            </a>
            <a href="#trust" className="hover:text-green-600 transition-colors">
              Pourquoi nous
            </a>
            <a href="#faq" className="hover:text-green-600 transition-colors">
              FAQ
            </a>
          </div>
          <a
            href="tel:+212600000000"
            className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
          >
            📞 0600-000-000
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-white pt-16 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-green-100">
            🌿 Service éco-responsable · Disponible 7j/7
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Réservez votre{" "}
            <span className="text-green-500">lavage à domicile</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            Choisissez votre service, votre date et votre adresse en quelques
            clics. Nos experts se déplacent chez vous.
          </p>
          {/* Car wash illustration */}
          <div className="flex justify-center mb-6">
            <svg
              width="280"
              height="120"
              viewBox="0 0 280 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="80"
                width="280"
                height="3"
                rx="1.5"
                fill="#e5e7eb"
              />
              <rect
                x="20"
                y="20"
                width="240"
                height="62"
                rx="14"
                fill="#f0fdf4"
              />
              <rect
                x="30"
                y="30"
                width="220"
                height="44"
                rx="10"
                fill="#dcfce7"
              />
              {/* Car body */}
              <rect
                x="45"
                y="52"
                width="190"
                height="36"
                rx="8"
                fill="#22c55e"
              />
              <rect
                x="70"
                y="38"
                width="130"
                height="30"
                rx="8"
                fill="#16a34a"
              />
              {/* Windows */}
              <rect
                x="78"
                y="42"
                width="50"
                height="22"
                rx="4"
                fill="#bbf7d0"
              />
              <rect
                x="136"
                y="42"
                width="56"
                height="22"
                rx="4"
                fill="#bbf7d0"
              />
              {/* Wheels */}
              <circle cx="88" cy="90" r="14" fill="#1f2937" />
              <circle cx="88" cy="90" r="8" fill="#6b7280" />
              <circle cx="88" cy="90" r="3" fill="#d1d5db" />
              <circle cx="192" cy="90" r="14" fill="#1f2937" />
              <circle cx="192" cy="90" r="8" fill="#6b7280" />
              <circle cx="192" cy="90" r="3" fill="#d1d5db" />
              {/* Water drops */}
              <path
                d="M248 25 Q251 18 254 25 Q254 31 248 31 Q248 25 248 25Z"
                fill="#60a5fa"
                opacity="0.7"
              />
              <path
                d="M260 10 Q263 3 266 10 Q266 16 260 16 Q260 10 260 10Z"
                fill="#60a5fa"
                opacity="0.5"
              />
              <path
                d="M238 10 Q241 3 244 10 Q244 16 238 16 Q238 10 238 10Z"
                fill="#60a5fa"
                opacity="0.6"
              />
              {/* Sparkles */}
              <text x="14" y="40" fontSize="16">
                ✨
              </text>
              <text x="248" y="70" fontSize="14">
                💧
              </text>
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">✅ Sans déplacement</span>
            <span className="flex items-center gap-1">✅ Produits premium</span>
            <span className="flex items-center gap-1">
              ✅ Paiement après service
            </span>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM + SUMMARY ── */}
      <section id="booking" className="max-w-6xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* LEFT: Form */}
            <div className="flex-1 space-y-6">
              {/* Service */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                data-error={errors.service ? true : undefined}
              >
                <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg text-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  Choisissez votre service
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-9">
                  Sélectionnez la prestation qui correspond à vos besoins
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(BASE_PRICES).map(([id, { label, price }]) => (
                    <ServiceCard
                      key={id}
                      id={id}
                      label={label}
                      price={price}
                      selected={form.service === id}
                      onClick={(v) => {
                        set("service", v);
                        setErrors((e) => ({ ...e, service: undefined }));
                      }}
                    />
                  ))}
                </div>
                <FieldError msg={errors.service} />
              </div>

              {/* Vehicle */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                data-error={errors.vehicleType ? true : undefined}
              >
                <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg text-sm flex items-center justify-center font-bold">
                    2
                  </span>
                  Type de véhicule
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-9">
                  Le tarif varie selon la taille du véhicule
                </p>
                <select
                  value={form.vehicleType}
                  onChange={(e) => {
                    set("vehicleType", e.target.value);
                    setErrors((er) => ({ ...er, vehicleType: undefined }));
                  }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white"
                >
                  <option value="">Sélectionnez un type de véhicule...</option>
                  {Object.entries(VEHICLE_MULTIPLIERS).map(
                    ([id, { label }]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    )
                  )}
                </select>
                <FieldError msg={errors.vehicleType} />
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg text-sm flex items-center justify-center font-bold">
                    3
                  </span>
                  Date et créneau horaire
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-9">
                  Disponible du lundi au dimanche
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Date souhaitée
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => {
                        set("date", e.target.value);
                        setErrors((er) => ({ ...er, date: undefined }));
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                    />
                    <FieldError msg={errors.date} />
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
                          onClick={() => {
                            set("timeSlot", slot);
                            setErrors((er) => ({ ...er, timeSlot: undefined }));
                          }}
                          className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                            form.timeSlot === slot
                              ? "bg-green-500 text-white border-green-500 shadow-sm"
                              : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    <FieldError msg={errors.timeSlot} />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg text-sm flex items-center justify-center font-bold">
                    4
                  </span>
                  Adresse d'intervention
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-9">
                  Où souhaitez-vous que nous intervenions ?
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Ville
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Casablanca, Rabat..."
                      value={form.city}
                      onChange={(e) => {
                        set("city", e.target.value);
                        setErrors((er) => ({ ...er, city: undefined }));
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <FieldError msg={errors.city} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Adresse complète
                    </label>
                    <input
                      type="text"
                      placeholder="Rue, numéro, résidence..."
                      value={form.address}
                      onChange={(e) => {
                        set("address", e.target.value);
                        setErrors((er) => ({ ...er, address: undefined }));
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <FieldError msg={errors.address} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Instructions supplémentaires{" "}
                      <span className="text-gray-400 font-normal">
                        (optionnel)
                      </span>
                    </label>
                    <textarea
                      placeholder="Ex : Code d'accès, interphone, parking disponible..."
                      value={form.instructions}
                      onChange={(e) => set("instructions", e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg text-sm flex items-center justify-center font-bold">
                    5
                  </span>
                  Vos coordonnées
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-9">
                  Pour confirmer et organiser votre rendez-vous
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      placeholder="Prénom et nom"
                      value={form.name}
                      onChange={(e) => {
                        set("name", e.target.value);
                        setErrors((er) => ({ ...er, name: undefined }));
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <FieldError msg={errors.name} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="06XX XXX XXX"
                        value={form.phone}
                        onChange={(e) => {
                          set("phone", e.target.value);
                          setErrors((er) => ({ ...er, phone: undefined }));
                        }}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <FieldError msg={errors.phone} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        E-mail{" "}
                        <span className="text-gray-400 font-normal">
                          (optionnel)
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={(e) => {
                          set("email", e.target.value);
                          setErrors((er) => ({ ...er, email: undefined }));
                        }}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Extras */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg text-sm flex items-center justify-center font-bold">
                    6
                  </span>
                  Services additionnels
                </h2>
                <p className="text-gray-400 text-sm mb-4 ml-9">
                  Personnalisez votre prestation
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(EXTRA_PRICES).map(
                    ([id, { label, price }]) => {
                      const checked = form.extras.includes(id);
                      return (
                        <label
                          key={id}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            checked
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleExtra(id)}
                            className="w-4 h-4 accent-green-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">
                              {label}
                            </p>
                            <p className="text-xs text-green-600 font-semibold">
                              +{price} MAD
                            </p>
                          </div>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Summary (sticky) */}
            <div className="w-full lg:w-80 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  🧾 Récapitulatif
                </h2>

                <div className="space-y-3 mb-6">
                  <SummaryRow
                    label="Service"
                    value={
                      form.service ? BASE_PRICES[form.service]?.label : "—"
                    }
                  />
                  <SummaryRow
                    label="Véhicule"
                    value={
                      form.vehicleType
                        ? VEHICLE_MULTIPLIERS[form.vehicleType]?.label
                        : "—"
                    }
                  />
                  <SummaryRow label="Date" value={form.date || "—"} />
                  <SummaryRow label="Heure" value={form.timeSlot || "—"} />
                  {form.extras.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Services additionnels
                      </p>
                      {form.extras.map((id) => (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-gray-600 text-xs">
                            • {EXTRA_PRICES[id]?.label}
                          </span>
                          <span className="text-gray-600 text-xs">
                            +{EXTRA_PRICES[id]?.price} MAD
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">
                      Total estimé
                    </span>
                    <span className="font-extrabold text-green-600 text-2xl">
                      {total > 0 ? `${total} MAD` : "—"}
                    </span>
                  </div>
                  {form.service && form.vehicleType && (
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      Prix final confirmé sur place
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-base shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Réservation en cours...
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
          </div>
        </form>
      </section>

      {/* ── TRUST ── */}
      <section id="trust" className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pourquoi choisir Lavage+ ?
            </h2>
            <p className="text-gray-500">
              Des professionnels certifiés à votre service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TrustCard
              icon="🏠"
              title="Service à domicile"
              desc="Nos techniciens se déplacent chez vous, où que vous soyez. Plus besoin de file d'attente ou de déplacement."
            />
            <TrustCard
              icon="🧪"
              title="Produits professionnels"
              desc="Nous utilisons uniquement des produits certifiés, respectueux de la carrosserie et de l'environnement."
            />
            <TrustCard
              icon="🛡️"
              title="Satisfaction garantie"
              desc="Pas satisfait ? Nous revenons sans frais supplémentaires. Votre satisfaction est notre priorité absolue."
            />
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Ce que disent nos clients
            </h2>
            <p className="text-gray-500">
              Plus de 500 avis vérifiés · Note moyenne 4,9/5
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard
              name="Karim Bensalem"
              location="Casablanca"
              rating={5}
              text="Service impeccable ! Voiture comme neuve en moins de 2h. Le technicien était ponctuel et très professionnel. Je recommande vivement."
            />
            <ReviewCard
              name="Fatima Zarhour"
              location="Rabat"
              rating={5}
              text="Excellente expérience. Le lavage complet de mon SUV était parfait. Les produits utilisés sentent bon et ne tachent pas. Je refais ça chaque mois !"
            />
            <ReviewCard
              name="Younes Tahiri"
              location="Marrakech"
              rating={4}
              text="Très bon rapport qualité/prix. J'ai pris le Premium detailing pour une grande occasion et le résultat était bluffant. Voiture comme à la sortie du concessionnaire."
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Questions fréquentes
            </h2>
            <p className="text-gray-500">
              Tout ce que vous devez savoir avant de réserver
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <FAQItem
              q="Combien de temps dure le lavage ?"
              a="La durée dépend du service choisi : 30 à 45 min pour un lavage extérieur, 45 à 60 min pour l'intérieur, 1h à 1h30 pour le lavage complet, et 2 à 3h pour le Premium detailing."
            />
            <FAQItem
              q="Quels modes de paiement acceptez-vous ?"
              a="Nous acceptons le paiement en espèces, par virement bancaire ou via Wave et Orange Money. Le paiement s'effectue uniquement après la prestation, une fois que vous êtes satisfait."
            />
            <FAQItem
              q="Dois-je fournir de l'eau ou de l'électricité ?"
              a="Non, notre équipe dispose de tout le matériel nécessaire : eau, aspirateur autonome, produits et équipements. Vous n'avez rien à préparer."
            />
            <FAQItem
              q="Puis-je annuler ma réservation ?"
              a="Oui, l'annulation est totalement gratuite jusqu'à 2 heures avant le rendez-vous. Contactez-nous par appel ou WhatsApp et nous annulerons sans aucun frais."
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h2l3 3v4h-2m-3-4v4M9 17H7m10 0h-4m4 0a2 2 0 100-4 2 2 0 000 4zM7 17a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
            <span className="font-bold text-white">
              Lavage<span className="text-green-500">+</span>
            </span>
          </div>
          <p className="text-sm text-center">
            © 2025 Lavage+. Tous droits réservés. Service disponible au Maroc.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-xs text-gray-400 flex-shrink-0">{label}</span>
      <span className="text-xs font-medium text-gray-700 text-right">
        {value}
      </span>
    </div>
  );
}
