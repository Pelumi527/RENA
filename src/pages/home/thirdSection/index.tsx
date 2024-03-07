import PrimaryButton from "../../../components/primaryButton";

const ThirdSection = () => {
  return (
    <div className="w-full h-fit z-20 relative" >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col mt-[254px] w-[781px] items-center">
          <p className="text-[42px] font-bold z-20 relative flex justify-center">
            How  <span className="text-primary mx-2">Liquid NFT </span>works?
          </p>
          <p className="text-[26px] font-semibold text-gray-light text-center">Liquid NFTs empower a new way of liquidity for non-fungible assets, based on Aptos Move Objects</p>
        </div>
        <div className="w-[1101px] h-[335px] flex flex-col mt-16">
          <div className="w-full flex justify-between">
            <div className="flex gap-[67px] mt-10">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step1.svg"
                  className="w-[91px] h-[91px] cursor-pointer mb-4"
                />
                <p className="text-[22px] text-gray-light font-semibold w-[112px] text-center">Get 1 $RENA token</p>
              </div>
              <img
                src="home/third/arrow-left.svg"
                className="w-[9px] h-[17px] cursor-pointer mb-4 mt-9"
              />
            </div>
            <div className="flex gap-[59px] mt-10">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step2.svg"
                  className="w-[191px] h-[97px] cursor-pointer mb-4"
                />
                <p className="text-[22px] text-gray-light font-semibold w-[220px] text-center">Claim 1 Renegades NFT with $RENA</p>
              </div>
              <img
                src="home/third/arrow-left.svg"
                className="w-[9px] h-[17px] cursor-pointer mb-4 mt-9"
              />
            </div>
            <div className="flex gap-[28px] mt-10">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step3.svg"
                  className="w-[191px] h-[97px] cursor-pointer mb-4"
                />
                <p className="text-[22px] text-gray-light font-semibold w-[209px] text-center">Your 1 $RENA token is embedded to the Renegades NFT</p>
              </div>
              <img
                src="home/third/arrow-left.svg"
                className="w-[9px] h-[17px] cursor-pointer mb-4 mt-9"
              />
            </div>
            <div className="flex">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step4.svg"
                  className="w-[206px] h-[136px] cursor-pointer mb-4"
                />
                <p className="text-[22px] text-gray-light font-semibold w-[263px] text-center">Your 1 $RENA token is embedded to the Renegades NFT</p>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center mt-10">
            <PrimaryButton className="z-20 relative w-[209px]">
              <p className="text-[18px] h-5 font-bold">Get $RENA</p>
              <p className="text-[16px] font-semibold">Coming soon</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
