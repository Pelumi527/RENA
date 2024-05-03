import React, { useState, useEffect } from "react";
import "./index.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import GridPanel from "../../components/gridPanel";
import MainSection from "./mainSection";
import SceondSection from "./sceondSection";
import ThirdSection from "./thirdSection";
import FourthSection from "./fourthSection";
import FifthSection from "./fifthSection";
import SixthSection from "./sixthSection";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("/home/bg-full.png");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 500) {
        setBackgroundImage("/home/bg-mobile.png");
      } else {
        setBackgroundImage("/home/bg-full.png");
      }
    };

    window.addEventListener("resize", updateBackground);
    updateBackground(); // Initial check

    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div className="parallax relative" id="cred-point">
      <div className="flex absolute w-full z-10">
        <GridPanel />
      </div>
      <Header />
      <MainSection />
      <div
        className="w-full flex flex-col justify-between h-[4800px] sm:h-[4000px] z-20 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        <div>
          <SceondSection />
          <ThirdSection />
          <FourthSection />
          <FifthSection />
        </div>
        <SixthSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
