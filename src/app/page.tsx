import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <section>
      <div className=" bg-sky-100 h-full flex flex-col ">
        <Navbar />
        <Hero />
      </div>
      <Reviews />
    </section>
  );
}
