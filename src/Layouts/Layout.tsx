import React from "react";

//components
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

type TProps = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout: React.FC<TProps> = ({ children, showHero = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
