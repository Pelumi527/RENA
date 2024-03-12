import { Icon } from "@iconify/react";
import { toggleClaimModal } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";
import { updateRenegadesData } from "../../state/renegades";

const ClaimModal = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bClaimModal);
  const [proceed, setProceed] = useState(0);
  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    dispatch(updateRenegadesData([
      {
        avatar: "/renegades/item1.svg",
        name: "Renegade #211",
        rank: "42",
        level: 1
      },
      {
        avatar: "/renegades/item2.svg",
        name: "Renegade #4999",
        rank: "142",
        level: 2
      },
      {
        avatar: "/renegades/item3.svg",
        name: "Renegade #629",
        rank: "1442",
        level: 3
      },
      {
        avatar: "/renegades/item4.svg",
        name: "Renegade #5",
        rank: "242",
        level: 3
      },
      {
        avatar: "/renegades/item5.svg",
        name: "Renegade #981",
        rank: "4412",
        level: 4
      },
      {
        avatar: "/renegades/item2.svg",
        name: "Renegade #4999",
        rank: "142",
        level: 2
      },
      {
        avatar: "/renegades/item3.svg",
        name: "Renegade #629",
        rank: "1442",
        level: 3
      }
    ]))
    dispatch(toggleClaimModal(false));
    setProceed(0)
  }

  const levelClass = (level: number) => {
    switch (level) {
      case 1: return 'text-[#B83032]';
      case 2: return 'text-[#FFC539]';
      case 3: return 'text-[#218380]';
      case 4: return 'text-[#FFF]';
      case 5: return 'text-[#FFC539]';
      default: return 'text-gray-500';
    }
  }

  const animationClass = isOpen ? 'animate-slideInUp' : 'animate-slideInDown';

  return (
    <div
      className={`${isOpen && "block"} ${animationClass} fixed z-[100] inset-0 h-full flex justify-center sm:items-center items-end bg-gray-dark-1`}
    >
      <div style={{ backgroundImage: `url("/renegades/bg-model.png")`, backgroundPosition: 'top 65px center', backgroundRepeat: 'no-repeat' }} className="custom-background-position relative w-full sm:w-[566px] h-[622px] sm:h-[469px] bg-[#222] border-gray-light-3 rounded-t-[8px] sm:rounded-[8px] p-6">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">You’ve got a new Renegade!</p>
            <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
              <Icon onClick={() => { dispatch(toggleClaimModal(false)); }} icon={'iconoir:cancel'} fontSize={34} className=" cursor-pointer" />
            </div>
          </div>
          <div className={`flex flex-col items-center justify-between mt-10`} >
            <div className="flex flex-col items-center">
              {proceed ?
                <img src="/renegades/item1.svg" className="w-[194px] h-[194px] rounded-[8px]" />
                :
                <img src="/renegades/item2.svg" className="w-[194px] h-[194px] rounded-[8px]" />
              }
              <p className="text-[26px] font-semibold mt-1" >Renegade #299</p>
              <div className={`leading-[130%] text-[18px] font-bold flex items-center justify-center] ${levelClass(5)}`}>
                <Icon icon={'ph:medal-fill'} fontSize={20} color={levelClass(5)} className="mr-1" />
                Rank {240}
                <p className="text-[#666] font-semibold">/5000</p>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6 mt-10 w-full">
              {proceed == 0 && <PrimaryButton onClick={() => { setProceed(1) }} className="block sm:hidden !font-bold text-[18px] w-full sm:w-[203px] h-12">Claim another NFT</PrimaryButton>}
              {proceed == 0 ?
                <SecondaryButton onClick={() => { dispatch(toggleClaimModal(false)); setProceed(0) }} className="!font-bold w-full sm:w-[203px] h-12">Close </SecondaryButton>
                :
                <SecondaryButton onClick={handleAddItem} className="!font-bold w-full sm:w-[203px] h-12">Great!</SecondaryButton>
              }
              {proceed == 0 && <PrimaryButton onClick={() => { setProceed(1) }} className="hidden sm:block !font-bold text-[18px] w-full sm:w-[203px] h-12">Claim another NFT</PrimaryButton>}
            </div>
          </div>
        </div>
      </div>

    </div >
  );
};

export default ClaimModal;
