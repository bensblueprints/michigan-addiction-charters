import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Species from "@/components/sections/Species";
import Trips from "@/components/sections/Trips";
import Deluxe from "@/components/sections/Deluxe";
import Boat from "@/components/sections/Boat";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Story />
      <Species />
      <Trips />
      <Deluxe />
      <Boat />
      <Process />
      <Testimonials />
      <CTA />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
