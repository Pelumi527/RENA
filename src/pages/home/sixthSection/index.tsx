import SecondaryButton from "../../../components/secondaryButton";

const SixthSection = () => {
  return (
    <div className="w-full h-fit z-20 relative">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="mb-[255px] sm:mb-[119px] flex flex-col w-[95%] md:w-[781px] items-center">
          <img
            src="/logo-white.svg"
            className="w-[301px] h-[174px] md:w-[431px] md:h-[248px] cursor-pointer mb-4"
          />
          <p className=" text-[22px] sm:text-[26px] font-semibold text-center w-[95%] md:w-[899px] leading-7 mt-8 mb-7 sm:mb-1">
            Be apart of the first Liquid NFT collection on Aptos!
          </p>
          <p className=" text-[22px] sm:text-[26px] font-semibold text-center w-[95%] md:w-[899px] leading-7 mb-8">
            Get $RENA and liquify your NFTs in a brand new way!
          </p>
          <div className="">
            <SecondaryButton className="z-20 h-12 relative w-[200px]">
              <p className="text-[18px] h-6 font-bold">Get $RENA</p>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
