import JoinUs from "../../../components/header/joinus";
import PrimaryButton from "../../../components/primaryButton";

const MainSection = () => {
  return (
    <div className="w-full h-[406px] flex flex-col items-center justify-center">
      <div className="w-[860px] h-[255px]">
        <p className="text-[77px] font-bold z-20 relative flex justify-center">
          Pioneering <span className="text-primary ml-2">Liquid NFT</span>
        </p>
        <p className="text-[26px] text-center font-semibold z-20 relative text-gray-light">Liquid NFT is an experimental fractionalized liquidity standard for NFTs via a mix of fungible & non-fungible tokens, based on Aptos Token</p>
        <div className="flex w-full justify-center mt-10">
          <PrimaryButton className="z-20 relative w-[209px]">
            <p className="text-[18px] h-5 font-bold">Get $RENA</p>
            <p className="text-[16px] font-semibold">Coming soon</p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
