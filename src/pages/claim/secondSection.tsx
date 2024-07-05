import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";

const SecondSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full mt-[238px] items-center px-4">
      <div className="flex items-start gap-8">
        <div className="flex flex-col h-[566px] sm:h-[420px] sm:justify-end ">
          <img
            src="/claim/second.svg"
            className="sm:hidden block h-[335px] cursor-pointer w-[452px]"
            alt=""
          />
          <p className="text-[32px] font-bold relative justify-start text-center sm:text-start leading-[130%] mt-20 sm:mt-0">
            Claim your NFTs{" "}
            <span className="mx-2 text-primary">
              <br className="sm:hidden" />
              using $RENA{" "}
            </span>
          </p>
          <p className="text-[22px] text-gray-light font-semibold z-20 relative flex justify-center mb-10 text-center sm:text-start">
            For every $RENA in your wallet you can claim a Renegade NFT
          </p>
          <p className="text-[22px] text-gray-light font-semibold z-20 relative flex justify-center sm:justify-start mb-4">
            Connect wallet to claim NFTsCool
          </p>
          <div className="flex justify-center w-full sm:justify-start">
            <PrimaryButton
              onClick={() => navigate("/renegades")}
              className="z-20 relative w-[200px]"
            >
              <p className="text-[18px] h-6 font-bold">Claim NFTs</p>
            </PrimaryButton>
          </div>
        </div>
        <img
          src="/claim/second.svg"
          className="hidden sm:block h-[335px] cursor-pointer w-[452px]"
          alt=""
        />
      </div>
    </div>
  );
};
export default SecondSection;
