import { Footer } from "../../components/layout/Footer/Footer";
import { Navbar } from "../../components/layout/NavBar/Navbar";
import { About } from "../../components/sections/About/About";
import { Contact } from "../../components/sections/Contact/Contact";
import { Hero } from "../../components/sections/Hero/Hero";

export const Home = () => {
  return (
    <>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
};