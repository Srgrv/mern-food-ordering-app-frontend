import React from "react";

//images
import hero from "../assets/hero.png";

const Hero: React.FC = () => {
  return (
    <div>
      <img src={hero} className="w-full max-h-[600px] object-cover" />
    </div>
  );
};

export default Hero;
