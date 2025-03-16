import React from "react";
import Navigation from "../components/home/Navigation";
import Hero from "../components/home/Hero";
import Features from "../components/home/Feartures";
import Services from "../components/home/Services";
import Stats from "../components/home/Stats";
import Footer from "../components/home/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <Features />
      <Services />
      <Stats />
      <Footer />
    </div>
  );
};

export default Landing;
