import React from "react";
import SliderUs from "../constent/SliderUs";

const WhyUs = () => {
  return (
    <section
      id="services"
      className="py-10 sm:py-14 md:py-16 px-4 lg:px-0 lg:py-20"
    >
      <h1 className="text-4xl font-bold text-center font-montserrat text-accent">
        Pourquoi choisir <span className="text-accent">notre service ?</span>
      </h1>

      <main className="flex flex-col items-center justify-center lg:flex-row mt-16 w-full lg:w-10/12 mx-auto gap-10">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-start mb-10 md:text-end">
              <div className="text-xl text-accent font-montserrat font-bold mb-2.5">
                Service à Domicile
              </div>

              <p className="text-justify text-sm text-neutral-600">
                Nous nous déplaçons directement chez vous pour nettoyer votre
                véhicule sans que vous ayez à vous déplacer.
              </p>
            </div>

            <hr />
          </li>

          <li>
            <hr />

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-end md:mb-10">
              <div className="text-xl text-accent font-montserrat font-bold mb-2.5">
                Équipe Professionnelle
              </div>

              <p className="text-justify text-sm text-neutral-600">
                Nos spécialistes assurent un lavage soigné avec une attention
                particulière aux moindres détails.
              </p>
            </div>

            <hr />
          </li>

          <li>
            <hr />

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-start mb-10 md:text-end">
              <div className="text-xl text-accent font-montserrat font-bold mb-2.5">
                Produits de Qualité
              </div>

              <p className="text-justify text-sm text-neutral-600">
                Nous utilisons des produits performants pour protéger la
                carrosserie et préserver l’éclat de votre véhicule.
              </p>
            </div>

            <hr />
          </li>

          <li>
            <hr />

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-end md:mb-10">
              <div className="text-xl text-accent font-montserrat font-bold mb-2.5">
                Rapidité et Efficacité
              </div>

              <p className="text-justify text-sm text-neutral-600">
                Un service rapide et efficace pour vous faire gagner du temps
                tout en garantissant un résultat impeccable.
              </p>
            </div>

            <hr />
          </li>

          <li>
            <hr />

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-start mb-10 md:text-end">
              <div className="text-xl text-accent font-montserrat font-bold mb-2.5">
                Satisfaction Garantie
              </div>

              <p className="text-justify text-sm text-neutral-600">
                Votre satisfaction est notre priorité. Nous veillons à fournir
                un service de qualité à chaque intervention.
              </p>
            </div>

            <hr />
          </li>

          <li>
            <hr />

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="timeline-end md:mb-10">
              <div className="text-xl text-accent font-montserrat font-bold mb-2.5">
                Tarifs Abordables
              </div>

              <p className="text-justify text-sm text-neutral-600">
                Profitez de prestations professionnelles à des prix accessibles
                et adaptés à tous les budgets.
              </p>
            </div>
          </li>
        </ul>

        <div className="w-full lg:w-2/5">
          <SliderUs />
        </div>
      </main>
    </section>
  );
};

export default WhyUs;
