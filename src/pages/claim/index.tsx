import Footer from "./footer";
import Header from "../../components/header";
import PrimaryButton from "../../components/primaryButton";
import MainSection from "./mainSection";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";
const Claim = () => {
  return (
    <div className="parallax relative" id="cred-point">
      <Header className="bg-[#121212] bg-opacity-100" claimButton="text-primary" />
      <div className="w-full flex flex-col h-[1720px] z-20 relative" style={{ backgroundImage: `url("/claim/bg-full.png")`, backgroundPosition: 'top', backgroundSize: 'cover' }}>
        <MainSection />
        <SecondSection />
        <ThirdSection />
      </div>
      <Footer />
    </div>
  );
};

export default Claim;