import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PrimaryButton from "../../components/primaryButton";
import MainSection from "./mainSection";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";
const Claim = () => {
  const [backgroundImage, setBackgroundImage] = useState("/home/bg-full.png");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 500) {
        setBackgroundImage("/claim/bg-mobile.png");
      } else {
        setBackgroundImage("/claim/bg-full.png");
      }
    };

    window.addEventListener("resize", updateBackground);
    updateBackground(); // Initial check

    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div className="parallax relative" id="cred-point">
      <Header className="bg-[#121212] bg-opacity-100" active={0} />
      <div
        className="w-full flex flex-col h-[2400px] sm:h-[1720px] z-20 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        <MainSection />
        <SecondSection />
        <ThirdSection />
      </div>
      <Footer />
    </div>
  );
};

export default Claim;
