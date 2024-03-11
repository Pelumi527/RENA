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
  return (
    <div className="parallax relative" id="cred-point">
      <div className="flex absolute w-full z-10">
        <GridPanel />
      </div>
      <Header />
      <MainSection />
      <div className="w-full flex flex-col justify-between h-[4000px] z-20 relative" style={{ backgroundImage: `url("/home/bg-full.png")`, backgroundPosition: 'top', backgroundSize: 'cover' }}>
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