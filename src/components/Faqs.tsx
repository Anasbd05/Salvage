import { faqs } from "@/assets/assets";
import React from "react";

const Faqs = () => {
  return (
    <section
      id="faqs"
      className="py-14 bg-linear-to-t from-[#eee] to-sky-100 md:py-16 lg:py-20"
    >
      <main className="flex flex-col w-11/12 mx-auto gap-10 lg:flex-row">
        <div className="flex flex-col items-center lg:items-start lg:w-2/4   gap-3">
          <h1 className="text-xl font-bold text-primary">FAQS</h1>
          <p className=" text-center lg:text-start text-3xl md:text-[54px] md:leading-15 font-bold tracking-tighter bg-linear-to-b from-black to-[#001E80] bg-clip-text text-transparent py-2 ">
            Des questions? Nous avons les réponses.
          </p>
        </div>
        <div className="flex flex-col w-full gap-4 lg:w-2/4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="join w-full shadow-sm p-1  shadow-gray-400 rounded-md join-horizontal "
            >
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <h1 className="collapse-title font-semibold text-black">
                  {faq.question}{" "}
                </h1>
                <p className="collapse-content font-medium text-sm text-neutral-900">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Faqs;
