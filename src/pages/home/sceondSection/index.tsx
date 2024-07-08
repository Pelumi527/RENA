const SceondSection = () => {
  return (
    <div className="relative z-20 w-full h-fit">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="mt-24 sm:mt-[240px] flex flex-col w-[95%] md:w-[781px] items-center">
          <img
            src="/logo-white.svg"
            className="w-[295px] h-[170px] md:w-[431px] md:h-[248px] cursor-pointer mb-4"
            alt=""
          />
          <img
            src="/home/avatar-home.svg"
            className="hidden md:block w-[490px] h-[244px] cursor-pointer mb-4"
            alt=""
          />
          <img
            src="/home/avatar-home-mobile.svg"
            className="block md:hidden w-[194px] h-[194px] cursor-pointer mb-12 rounded-lg"
            alt=""
          />
          <p className="text-[26px] md:text-[32px] font-bold text-center w-[85%]">
            The First Liquid NFT collection on Aptos
          </p>
          <p className="text-[22px] md:text-[26px] font-semibold text-center">
            with 5,000 NFTs and $RENA to blaze a trail in the semi-fungible
            ecosystem with the Move language
          </p>
        </div>
      </div>
    </div>
  );
};

export default SceondSection;
