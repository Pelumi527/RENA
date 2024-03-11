import SecondaryButton from "../../../components/secondaryButton";

const SixthSection = () => {
  return (
    <div className="w-full h-fit z-20 relative">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="mb-[119px] flex flex-col w-[781px] items-center">
          <img
            src="/logo-white.svg"
            className="w-[431px] h-[248px] cursor-pointer mb-4"
          />
          <p className="text-[26px] font-semibold text-center w-[899px] leading-7 my-8">Be apart of the first Liquid NFT collection on Aptos!<br /> Get $RENA and liquify your NFTs in a brand new way!</p>
          <div className="">
            <SecondaryButton className="z-20 h-12 relative w-[200px]">
              <p className="text-[18px] h-5 font-bold">Get $RENA</p>
              <p className="text-[16px] font-semibold">Coming soon</p>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
