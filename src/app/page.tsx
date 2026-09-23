import Hero from "@/components/tm/Hero";
import About from "@/components/tm/About";
import WhyUs from "@/components/tm/WhyUs";
import Shifts from "@/components/tm/Shifts";
import Moments from "@/components/tm/Moments";
import Reviews from "@/components/tm/Reviews";
import Faq from "@/components/tm/Faq";
import LeadForm from "@/components/tm/LeadForm";
import Footer from "@/components/tm/Footer";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <About />
      <WhyUs />
      <Shifts />
      <Moments />
      <Reviews />
      <Faq />
      <LeadForm />
      <Footer />
    </main>
  );
}
