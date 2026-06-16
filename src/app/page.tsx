import Faqs from "@/components/Faqs";
import { Features } from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Howwork from "@/components/HowWork";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <section>
      <div className=" bg-sky-100 h-full flex flex-col ">
        <Navbar />
        <Hero />
      </div>
      <Features />
      <WhyUs />
      <Howwork />
      <Reviews />
      <Faqs />
      <Footer />
    </section>
  );
}
