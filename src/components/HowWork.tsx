import SliderWorks from "@/constent/SliderWorks";
import { howWorks } from "../assets/assets";

const Howwork = () => {
  return (
    <section id="how" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col items-center gap-2.5">
        <h1 className="text-4xl font-bold font-montserrat text-accent">
          Comment ça fonctionne
        </h1>
        <p className="text-neutral-700 font-semibold">
          Decotis réinvente la décoration d&lsquo;intérieur et vous la simplifie
          en 3 étapes
        </p>
      </div>
      <div className="lg:grid hidden lg:grid-cols-3 px-4 my-16 gap-8">
        {howWorks.map((item, index) => (
          <div
            key={index}
            className=" p-8 shadow-sm rounded-sm relative bg-gray-50"
          >
            <span className="absolute -top-9 right-20 w-18 h-18 shadow-md justify-center items-center text-2xl flex font-bold bg-gray-100 text-accent hover:bg-accent hover:text-white duration-500 rounded-full">
              {item.id}
            </span>
            <div className="flex flex-col gap-2.5">
              <h1 className="text-2xl font-semibold font-montserrat">
                {item.title}
              </h1>
              <p className="text-neutral-600 hover:translate-x-1 duration-700 mt-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex my-16 lg:hidden">
        <SliderWorks />
      </div>
    </section>
  );
};

export default Howwork;
