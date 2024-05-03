import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";

const ThirdSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full mt-[206px] items-center px-4">
      <div className="flex sm:flex-row flex-col items-center sm:items-start gap-20 sm:gap-[100px]">
        <img
          src="/claim/third.svg"
          className="h-[239px] sm:h-[396px] cursor-pointer w-[316px] sm:w-[525px]"
        />
        <div className="flex flex-col h-[420px] sm:justify-end ">
          <p className="text-[32px] font-bold relative text-center sm:text-start">
            Liquify NFTs to get{" "}
            <span className="text-primary mx-2">
              <br className="sm:hidden" />
              $RENA back{" "}
            </span>
          </p>
          <p className="text-center sm:text-start w-full sm:w-[451px] text-[22px] text-gray-light font-semibold z-20 relative flex justify-center mb-10">
            Want your $RENA back? Liquify and send Renegade NFTs back to the
            pool to retrieve $RENA
          </p>
          <p className="text-[22px] text-center sm:text-start text-gray-light font-semibold z-20 relative flex justify-start mb-4">
            Connect wallet to Liquify NFTs and get $RENA
          </p>
          <div className="flex w-full justify-center sm:justify-start">
            <PrimaryButton
              onClick={() => navigate("/renegades")}
              className="z-20 relative w-[200px]"
            >
              <p className="text-[18px] h-6 font-bold">Liquify NFTs</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThirdSection;
