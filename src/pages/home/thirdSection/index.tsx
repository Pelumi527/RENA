import { Icon } from "@iconify/react";

const ThirdSection = () => {
  return (
    <div className="relative z-20 w-full h-fit">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col mt-[192px] sm:mt-[184px] w-[95%] sm:w-[781px] items-center">
          <p className="text-[32px] sm:text-[42px] font-bold z-20 relative flex justify-center">
            How <span className="mx-2 text-primary">Liquid NFT </span>works?
          </p>
          <p className="text-[22px] sm:text-[26px] font-semibold text-gray-light text-center mt-4">
            Liquid NFTs empower a new way of liquidity for non-fungible assets,
            based on Aptos Move Objects
          </p>
        </div>
        <div className="w-[95%] lg:w-[1100px] sm:h-[335px] flex flex-col mt-6 lg:mt-16">
          <div className="flex flex-col items-center justify-between w-full sm:flex-row">
            <div className="flex flex-col items-center mt-12 sm:flex-row sm:mt-10 sm:gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step1.svg"
                  className="w-[91px] h-[91px] cursor-pointer mb-4"
                  alt=""
                />
                <p className="text-[18px] lg:text-[22px] text-gray-light font-semibold sm:w-[112px] text-center">
                  Get 1 $RENA token
                </p>
              </div>
              <Icon
                icon={"bi:caret-right-fill"}
                className="mb-4 mt-9 text-[20px] hidden sm:block"
              />
              <Icon
                icon={"fa:caret-down"}
                className="-mb-1 mt-7 sm:mt-9 text-[20px] block sm:hidden"
              />
            </div>
            <div className="flex flex-col items-center mt-12 sm:flex-row sm:mt-10 sm:gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step2.svg"
                  className="w-[191px] h-[97px] cursor-pointer mb-4"
                  alt=""
                />
                <p className="text-[18px] lg:text-[22px] text-gray-light font-semibold w-[217px] sm:w-[220px] text-center">
                  Claim 1 Renegades NFT with $RENA
                </p>
              </div>
              <Icon
                icon={"bi:caret-right-fill"}
                className="mb-4 mt-9 text-[20px] hidden sm:block"
              />
              <Icon
                icon={"fa:caret-down"}
                className="-mb-1 mt-7 sm:mt-9 text-[20px] block sm:hidden"
              />
            </div>
            <div className="flex flex-col items-center mt-12 sm:flex-row sm:mt-10 sm:gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step3.svg"
                  className="w-[191px] h-[97px] cursor-pointer mb-4"
                  alt=""
                />
                <p className="text-[18px] lg:text-[22px] text-gray-light font-semibold w-[309px] sm:w-[200px] text-center">
                  Your 1 $RENA token is embedded to the Renegades NFT
                </p>
              </div>
              <Icon
                icon={"bi:caret-right-fill"}
                className="mb-4 mt-9 text-[20px] hidden sm:block"
              />
              <Icon
                icon={"fa:caret-down"}
                className="-mb-1 mt-7 sm:mt-9 text-[20px] block sm:hidden"
              />
            </div>
            <div className="flex mt-10 sm:mt-0">
              <div className="flex flex-col items-center">
                <img
                  src="home/third/step4.svg"
                  className="w-[206px] h-[136px] cursor-pointer mb-4"
                  alt=""
                />
                <p className="text-[18px] lg:text-[22px] text-gray-light font-semibold w-[250px] sm:w-[263px] text-center">
                  Want your 1 $RENA back? Transfer the NFT back to the pool and
                  reclaim $RENA!
                </p>
              </div>
            </div>
          </div>
          {/* <div className="justify-center hidden w-full sm:flex mt-14">
            <PrimaryButton className="z-20 relative w-[200px]">
              <Link to={"/presale"}>
                <p className="text-[18px] h-6 font-bold">Get $RENA</p>
              </Link>
            </PrimaryButton>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
