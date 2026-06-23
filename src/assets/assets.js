import sadie from "./Sadie.png";
import bono from "./bounou.png";
import madd from "./Madd.png";
import jimmy from "./saul.png";

export const reviews = [
  {
    id: 1,
    image: sadie,
    username: "Noura Sqali",
    comment:
      "L'équipe a complètement transformé mon espace ! De la consultation initiale à l'installation finale, tout s'est déroulé de manière fluide et professionnelle. J'ai été particulièrement impressionnée par la façon dont ils ont combiné fonctionnalité et esthétique. Mon salon est maintenant chaleureux, moderne et unique.",
  },
  {
    id: 2,
    username: "Mehdi ribati",
    image: madd,
    comment:
      "Super satisfait du service de design d'intérieur. Ils ont vraiment écouté ce que je voulais et ont proposé des idées créatives auxquelles je n'aurais pas pensé moi-même. La palette de couleurs et les choix de meubles étaient parfaits. Je profite maintenant de mon chez-moi plus que jamais.",
  },
  {
    id: 3,
    username: "Driss El hettab",
    image: jimmy,
    comment:
      "Je suis impressionné par la façon dont ils ont capté ma vision ! Je voulais une ambiance chaleureuse et cosy avec des éléments naturels, et ils ont absolument réussi. L'attention aux détails était impressionnante, et tout le processus a été collaboratif et agréable.",
  },
  {
    id: 4,
    username: "Yassine bounou",
    image: bono,
    comment:
      "Une excellente expérience du début à la fin. Les designers étaient sympathiques, patients et pleins d'idées fraîches. Ils ont complètement transformé ma chambre en un espace paisible et élégant. C'est maintenant ma pièce préférée de la maison !",
  },
];

export const services = [
  {
    icon: "🚿",
    label: "Lavage exterior",
    price: 120,
  },
  {
    icon: "🛋️",
    label: "Lavage interior",
    price: 150,
  },
  {
    icon: "✨",
    label: "Lavage complet",
    price: 250,
  },
  {
    icon: "💎",
    label: "Premium detailing",
    price: 400,
  },
];
export const vehiculeCategories = [
  { label: "Petite voiture", name: "Citadine" },
  { label: "Berline", name: "Berline" },
  { label: "SUV / 4x4", name: "SUV_4x4" },
  { label: "Véhicule utilitaire", name: "Utilitaire" },
  { label: "Pick-up", name: "Pickup" },
];

export const carBrands = [
  { label: "Dacia", name: "Dacia" },
  { label: "Renault", name: "Renault" },
  { label: "Peugeot", name: "Peugeot" },
  { label: "Citroën", name: "Citroen" },
  { label: "Volkswagen", name: "Volkswagen" },
  { label: "Hyundai", name: "Hyundai" },
  { label: "Kia", name: "Kia" },
  { label: "Toyota", name: "Toyota" },
  { label: "Fiat", name: "Fiat" },
  { label: "Ford", name: "Ford" },
  { label: "Nissan", name: "Nissan" },
  { label: "Opel", name: "Opel" },
  { label: "Seat", name: "Seat" },
  { label: "Skoda", name: "Skoda" },
  { label: "Audi", name: "Audi" },
  { label: "BMW", name: "BMW" },
  { label: "Mercedes-Benz", name: "Mercedes-Benz" },
  { label: "Honda", name: "Honda" },
  { label: "Mazda", name: "Mazda" },
  { label: "Suzuki", name: "Suzuki" },
  { label: "Mitsubishi", name: "Mitsubishi" },
  { label: "Jeep", name: "Jeep" },
  { label: "Land Rover", name: "Land Rover" },
  { label: "Volvo", name: "Volvo" },
  { label: "Porsche", name: "Porsche" },
  { label: "Mini", name: "Mini" },
  { label: "Cupra", name: "Cupra" },
  { label: "MG", name: "MG" },
  { label: "BYD", name: "BYD" },
  { label: "Chery", name: "Chery" },
  { label: "Geely", name: "Geely" },
  { label: "DFSK", name: "DFSK" },
  { label: "Tesla", name: "Tesla" },
  { label: "Lexus", name: "Lexus" },
  { label: "Jaguar", name: "Jaguar" },
  { label: "Alfa Romeo", name: "Alfa Romeo" },
  { label: "Chevrolet", name: "Chevrolet" },
  { label: "Isuzu", name: "Isuzu" },
];

export const faqs = [
  {
    question: "Combien de temps dure un lavage à domicile ?",
    answer:
      "La durée dépend du service choisi et de l’état du véhicule. En général, un lavage prend entre 45 minutes et 2 heures.",
  },
  {
    question: "Dois-je fournir de l’eau ou de l’électricité ?",
    answer:
      "Non, notre équipe est équipée du matériel nécessaire pour réaliser le lavage dans les meilleures conditions.",
  },
  {
    question: "Comment puis-je réserver un lavage ?",
    answer:
      "Il suffit de remplir le formulaire de réservation en indiquant vos informations, votre véhicule et le créneau souhaité.",
  },
  {
    question: "Comment vais-je savoir si ma réservation est acceptée ?",
    answer:
      "Après réception de votre demande, nous vous contacterons par e-mail pour confirmer ou refuser votre réservation.",
  },
  {
    question: "Puis-je modifier ou annuler ma réservation ?",
    answer:
      "Oui, vous pouvez nous contacter avant la date prévue afin de modifier ou annuler votre réservation.",
  },
  {
    question: "Quels types de véhicules acceptez-vous ?",
    answer:
      "Nous intervenons sur la plupart des véhicules : citadines, berlines, SUV, utilitaires, pick-up et véhicules de luxe.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons actuellement le paiement en espèces ainsi que d’autres moyens de paiement selon disponibilité.",
  },
  {
    question: "Intervenez-vous dans toutes les villes ?",
    answer:
      "Notre zone d’intervention dépend de la disponibilité de nos équipes. Indiquez votre ville lors de la réservation pour vérifier l’éligibilité.",
  },
];

import { Target, Bookmark, Library, ScrollText, Sparkles } from "lucide-react";

export const features = [
  {
    icon: Target,
    title: "Lavage à domicile",
    description:
      "Profitez d’un lavage professionnel directement chez vous, sans avoir à vous déplacer.",
  },
  {
    icon: Library,
    title: "Produits de qualité",
    description:
      "Nous utilisons des produits performants et adaptés pour protéger votre véhicule et préserver sa brillance.",
  },
  {
    icon: Sparkles,
    title: "Nettoyage intérieur",
    description:
      "Aspiration, nettoyage des surfaces et finition soignée pour un habitacle propre et agréable.",
  },
  {
    icon: ScrollText,
    title: "Nettoyage extérieur",
    description:
      "Un lavage complet de la carrosserie, des vitres et des jantes pour un résultat impeccable.",
  },
  {
    icon: Bookmark,
    title: "Réservation facile",
    description:
      "Choisissez votre véhicule, votre service et votre créneau en quelques clics seulement.",
  },
  {
    icon: Target,
    title: "Satisfaction garantie",
    description:
      "Notre priorité est de vous offrir un service fiable, rapide et à la hauteur de vos attentes.",
  },
];

export const howWorks = [
  {
    id: "01",
    title: "Réservez en ligne",
    description:
      "Choisissez votre véhicule, le service souhaité ainsi que la date et l’heure qui vous conviennent. La réservation ne prend que quelques minutes.",
  },
  {
    id: "02",
    title: "Confirmation",
    description:
      "Notre équipe examine votre demande et vous contacte rapidement par e-mail pour confirmer ou refuser votre réservation selon les disponibilités.",
  },
  {
    id: "03",
    title: "Lavage à domicile",
    description:
      "Une fois la réservation confirmée, nous nous déplaçons directement chez vous pour réaliser un lavage complet, professionnel et soigné de votre véhicule.",
  },
];

import Audi_A5BF from "./Audi_A5bf.png";
import Audi_A5 from "./Audi_A5.png";
import Q8 from "./Q8.png";
import Q8_bf from "./Q8_bf.png";
import Audi_RS6 from "./Audi_RS6.png";
import Audi_RS6bf from "./Audi_RS6bf.png";
import Audi_interior from "./Audi_interior.png";
import Audi_interiorBF from "./Audi_interiorBF.png";
import Dodge_bf from "./Dodge_bf.png";
import Dodge from "./Dodge_charger.png";
import Mercedes from "./Mercedes.png";
import Mercedes_bf from "./Mercedes_bf.png";
import mercedes_interBF from "./mercedes_interBF.png";
import Mercedes_interior from "./Mercedes_interior.png";
import Van1bf from "./Van_1bf.png";
import Van2bf from "./Van_2bf.png";
import Van2 from "./Van_2.png";
import Van1 from "./Van_1.png";

export const workImages = [
  {
    before: Audi_A5BF,
    After: Audi_A5,
    alt: "Audi A5",
  },
  {
    before: Audi_interiorBF,
    After: Audi_interior,
    alt: "Audi_interior",
  },
  {
    before: Audi_RS6bf,
    After: Audi_RS6,
    alt: "Audi_RS6",
  },
  {
    before: Q8_bf,
    After: Q8,
    alt: "Audi_RS6",
  },
  {
    before: Dodge_bf,
    After: Dodge,
    alt: "Audi_RS6",
  },
  {
    before: Mercedes_bf,
    After: Mercedes,
    alt: "Audi_RS6",
  },
  {
    before: mercedes_interBF,
    After: Mercedes_interior,
    alt: "Audi_RS6",
  },
  {
    before: Van1bf,
    After: Van1,
    alt: "Audi_RS6",
  },
  {
    before: Van2bf,
    After: Van2,
    alt: "Audi_RS6",
  },
];
