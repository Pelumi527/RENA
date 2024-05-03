import React from "react";

interface ComparisonFeature {
  feature: string;
  liquidNFT: boolean;
  erc404: boolean;
}

const comparisonData: ComparisonFeature[] = [
  { feature: "Official recognition", liquidNFT: true, erc404: false },
  { feature: "On-chain random NFT draws", liquidNFT: true, erc404: false },
  { feature: "Composability", liquidNFT: true, erc404: false },
];

const FourthSection = () => {
  return (
    <div className="w-full h-fit z-20 relative">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col mt-[236px] sm:mt-[352px] w-[90%] lg:w-[921px] items-center">
          <p className="text-[32px] sm:text-[42px] font-bold z-20 relative text-center leading-[130%]">
            How does <span className="text-primary mx-2">Liquid NFT</span>{" "}
            standard compare to ERC-404?
          </p>
          <p className=" text-[22px] sm:text-[26px] font-semibold text-gray-light text-center">
            Unleashing the power of Aptos Move Objects
          </p>
        </div>
        <div className="w-[95%] lg:w-[1100px] h-[363px] flex flex-col mt-14 sm:mt-[72px] border border-[#666] rounded-[8px]">
          <div className="flex flex-row h-[120px] border-b border-[#666]">
            <div className="w-full lg:w-[581px]" />
            <div className="w-[88px] sm:w-[260px] flex-shrink-0 flex flex-col items-center justify-center border-x border-[#666]">
              <p className="text-primary text-[20px] sm:text-[32px] w-[72px] sm:w-full text-center leading-5 font-bold h-[38px] mt-4">
                Liquid NFT{" "}
              </p>
              <img
                src="/home/fourth/logo.svg"
                className="w-[70px] sm:w-[80px] h-[30px] sm:h-[50px] cursor-pointer"
              />
            </div>
            <div className="w-[88px] sm:w-[260px] flex-shrink-0 flex flex-col items-center justify-center">
              <p className="text-white text-[20px] sm:text-[32px] font-bold h-[38px]">
                ERC-404
              </p>
              <img
                src="/home/fourth/pandora.svg"
                className="w-[75px] h-[26px] sm:w-[125px] sm:h-[40px] cursor-pointer"
              />
            </div>
          </div>
          {comparisonData.map(({ feature, liquidNFT, erc404 }) => (
            <div
              key={feature}
              className="flex flex-row h-[82px] border-b border-[#666]"
            >
              <div className="w-full lg:w-[580px] flex items-center">
                <p className="text-[22px] font-semibold sm:ml-8 m-1 leading-6">
                  {feature}
                </p>
              </div>
              <div className="w-[88px] sm:w-[259px] flex-shrink-0 flex flex-col items-center justify-center border-x border-[#666]">
                <img
                  src={`/home/fourth/${liquidNFT ? "check" : "x"}-icon.svg`}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
              <div className="w-[88px] sm:w-[259px] sm:mr-[1px] flex-shrink-0 flex flex-col items-center justify-center">
                <img
                  src={`/home/fourth/${erc404 ? "check" : "x"}-icon.svg`}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
