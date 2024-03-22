import JoinUs from "../../../components/header/joinus";
import PrimaryButton from "../../../components/primaryButton";

const MainSection = () => {
  return (
    <div className="w-full h-[572px] sm:h-[306px] flex flex-col items-center mt-[96px] md:mt-[128px]">
      <div className="flex flex-col items-center w-[95%] md:w-[556px] lg:w-[860px] h-[255px]">
        <div className="flex leading-[58px] items-center flex-col md:flex-row w-[300px] md:w-full text-[56px] md:text-[58px] lg:text-[77px] font-bold z-20 relative justify-center">
          <p>Pioneering</p><span className="text-primary ml-2 ">LiquidNFT</span>
        </div>
        <p className="text-[22px] mt-6 md:text-[26px] text-center font-semibold z-20 relative text-gray-light">Liquid NFT is an experimental fractionalized liquidity standard for NFTs via a mix of fungible & non-fungible tokens, based on Aptos Token</p>
        <div className="flex w-full justify-center mt-10">
          <PrimaryButton className="z-20 relative w-[200px]">
            <p className="text-[18px] h-6 font-bold">Get $RENA</p>
          </PrimaryButton>
        </div>
      </div>
    </div >
  );
};

export default MainSection;
