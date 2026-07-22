import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Approach from "@/components/sections/Approach";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Comparison from "@/components/sections/Comparison";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Services />
      <Approach />
      <Projects />
      <Comparison />
      <Pricing />
      <Contact />
      <Faq />
      <Footer />
    </main>
  );
}
