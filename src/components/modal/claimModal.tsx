import { Icon } from "@iconify/react";
import { toggleClaimModal } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useState } from "react";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useTokenList from "../../hook/useTokenList";
import useTokenBalance from "../../hook/useTokenBalance";
import useClaim from "../../hook/useClaim";

const ClaimModal = () => {
  const updateTokenList = useTokenList();
  const updateTokenBalance = useTokenBalance();
  const claim = useClaim();

  const isOpen = useAppSelector((state) => state.dialogState.bClaimModal);
  const lastRenegadesData = useAppSelector((state) => state.renegadesState.lastRenegadesData);
  const [proceed, setProceed] = useState(0);
  const dispatch = useAppDispatch();
  const { account } = useWallet();
  const renaBalance = useAppSelector(state => state.renegadesState.renaBalance);

  const fetchEvents = async () => {
    if (account) {
      try {
        updateTokenList(account.address);
        updateTokenBalance(account.address);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onClaim = async () => {
    if (account) {
      try {
        await claim(account.address);
        fetchEvents();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const animationClass = isOpen ? 'animate-slideInUp' : 'animate-slideInDown';

  return (
    <div
      className={`${isOpen && "block"} ${animationClass} fixed z-[100] inset-0 h-full flex justify-center sm:items-center items-end bg-gray-dark-1`}
    >
      <div style={{ backgroundImage: `url("/renegades/bg-model.png")`, backgroundPosition: 'top 65px center', backgroundRepeat: 'no-repeat' }} className="custom-background-position relative w-full sm:w-[566px] h-[622px] sm:h-[469px] bg-[#222] border-gray-light-3 rounded-t-[8px] sm:rounded-[8px] py-4 px-6">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <p className="text-[26px] font-semibold text-[#FFF] leading-[130%]">You’ve got a new Renegade!</p>
            <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
              <Icon onClick={() => { dispatch(toggleClaimModal(false)); }} icon={'iconoir:cancel'} fontSize={34} className=" cursor-pointer" />
            </div>
          </div>
          <div className={`flex flex-col items-center justify-between mt-10`} >
            <div className="flex flex-col items-center">
              <img src={lastRenegadesData?.token_uri} className="w-[194px] h-[194px] rounded-[8px]" />
              <p className="text-[26px] font-semibold mt-1" >{lastRenegadesData?.token_name}</p>
              {/* <div className={`leading-[130%] text-[18px] font-bold flex items-center justify-center] ${levelClass(5)}`}>
                <Icon icon={'ph:medal-fill'} fontSize={20} color={levelClass(5)} className="mr-1" />
                Rank {240}
                <p className="text-[#666] font-semibold">/5000</p>
              </div> */}
            </div>
            <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6 mt-9 w-full">
              {renaBalance > 0 && <PrimaryButton onClick={onClaim} className="block sm:hidden !font-bold text-[18px] w-full sm:w-[203px] h-12">Claim another NFT</PrimaryButton>}
              {renaBalance > 0 ?
                <SecondaryButton onClick={() => { dispatch(toggleClaimModal(false)); setProceed(0) }} className="!font-bold w-full sm:w-[203px] h-12">Close </SecondaryButton>
                :
                <SecondaryButton onClick={() => { dispatch(toggleClaimModal(false)); setProceed(0) }} className="!font-bold w-full sm:w-[203px] h-12">Great!</SecondaryButton>
              }
              {renaBalance > 0 && <PrimaryButton onClick={onClaim} className="hidden sm:block !font-bold text-[18px] w-full sm:w-[203px] h-12">Claim another NFT</PrimaryButton>}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ClaimModal;
