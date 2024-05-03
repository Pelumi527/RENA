import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";
import { useDispatch } from "react-redux";
import { toggleWalletPanel } from "../../state/dialog";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const MainSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { connected, account } = useWallet();

  return (
    <div className="flex flex-col w-full items-center">
      <p className="text-[42px] sm:text-[58px] mt-[100px] font-bold w-[268px] sm:w-full text-center leading-[130%]">
        Claim or Liquify NFTs
      </p>
      <p className="text-[22px] sm:text-[26px] font-semibold text-gray-light text-center mt-8 sm:mt-0">
        Claim NFTs or Liquify them to get $RENA back
      </p>
      <div className="flex w-full justify-center mt-14">
        {connected ? (
          <PrimaryButton
            onClick={() => navigate("/renegades")}
            className="z-20 relative w-[200px]"
          >
            <p className="text-[18px] h-6 font-bold">See My Renegades</p>
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() => dispatch(toggleWalletPanel(true))}
            className="z-20 relative w-[200px]"
          >
            <p className="text-[18px] h-6 font-bold">Connect Wallet</p>
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
export default MainSection;
