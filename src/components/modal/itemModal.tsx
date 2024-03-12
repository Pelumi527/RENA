import { Icon } from "@iconify/react";
import { toggleItemModal } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";

const ItemModal = () => {
  const data = useAppSelector((state) => state.dialogState.bItemModal);
  const [liquify, setLiquify] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const dispatch = useAppDispatch();

  // Toggle function for checkbox
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const dataItems = [
    { title: "BACKGROUND", description: "Green", percentage: "15.2%" },
    { title: "BODY", description: "White", percentage: "15.2%" },
    { title: "EXPRESSION", description: "Angry", percentage: "15.2%" },
    { title: "HAIR", description: "Short Pointy", percentage: "15.2%" },
    { title: "OUTFIT", description: "Tattoo", percentage: "15.2%" },
  ];

  const levelClass = (level: number) => {
    switch (level) {
      case 1: return 'text-[#B83032]';
      case 2: return 'text-[#FFC539]';
      case 3: return 'text-[#218380]';
      case 4: return 'text-[#FFF]';
      default: return 'text-gray-500';
    }
  }

  const animationClass = data ? 'animate-slideInUp' : 'animate-slideInDown';

  return (
    <div
      className={`${data && "block"} ${animationClass} fixed z-[100] inset-0 h-full flex justify-center items-end sm:items-center bg-gray-dark-1`}
    >
      {liquify == 1 &&
        <div className="overflow-y-scroll relative w-full sm:w-[566px] h-[625px] sm:h-[510px] bg-[#222] border-gray-light-3 rounded-[8px] px-4 py-6">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">Proceed and liquify {data?.name}?</p>
              <Icon onClick={() => { dispatch(toggleItemModal(false)); setLiquify(0) }} icon={'iconoir:cancel'} fontSize={34} className=" cursor-pointer" />
            </div>
            <div className="flex my-8 sm:my-12 items-center justify-center">
              <img src={data?.avatar} className="w-[150px] h-[150px] rounded-[8px]" />
              <Icon icon={'solar:arrow-right-bold-duotone'} fontSize={34} className="text-primary ml-9 mr-[22px]" />
              <img src='/renegades/rena.svg' className="w-[88px] h-[88pxpx]" />
            </div>
            <p className="text-[18px] font-semibold text-[#FFF] mt-4 leading-[130%] text-center">If you proceed you will lose the NFT, send it back to the NFT pool and get 1 $RENA. Are you sure you want to proceed?</p>
            <div className="flex justify-center gap-4 sm:gap-6 my-6 items-center w-full sm:flex-row flex-col">
              <PrimaryButton onClick={() => setLiquify(2)} className="block sm:hidden !font-bold w-full sm:w-[253px] h-12">Liquify NFT and get 1 $RENA</PrimaryButton>
              <SecondaryButton className="!font-bold w-full sm:w-[203px] h-12">Cancel</SecondaryButton>
              <PrimaryButton onClick={() => setLiquify(2)} className="hidden sm:block !font-bold w-full sm:w-[253px] h-12">Liquify NFT and get 1 $RENA</PrimaryButton>
            </div>
            <div className="flex items-center justify-center">
              {isChecked ? (
                <img src="/component/checkbox-active.svg" className="w-[32px] h-[32px] cursor-pointer" onClick={toggleCheckbox} />
              ) : (
                <img src="/component/checkbox-inactive.svg" className="w-[32px] h-[32px] cursor-pointer" onClick={toggleCheckbox} />
              )}
              <p className="text-lg h-[25px] ml-1 font-semibold">Don’t show this dialog again</p>
            </div>
          </div>
        </div>
      }
      {liquify == 0 &&
        < div className="relative w-full sm:w-[965px] h-[95%] sm:h-[545px] bg-[#222] border-gray-light-3 rounded-[8px] py-6 px-4 overflow-y-scroll">
          <div className="flex w-full justify-between">
            <img src={data?.avatar} className="hidden sm:block w-[328px] h-[328px] sm:w-[497px] sm:h-[497px] rounded-[8px]" />
            <div className="flex flex-col w-[388px]">
              <div className="flex justify-between h-[62px]">
                <div className="flex flex-col items-start">
                  <p className="text-[32px] font-bold leading-[38px]">{data?.name}</p>
                  <div className={`leading-[130%] text-[18px] font-bold flex items-center justify-center mb-[297px] ${levelClass(data?.level)}`}>
                    <Icon icon={'ph:medal-fill'} fontSize={20} color={levelClass(data?.level)} className="mr-1" />
                    Rank {data?.rank}
                    <p className="text-[#666] font-semibold">/5000</p>
                  </div>
                </div>
                <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                  <Icon onClick={() => { dispatch(toggleItemModal(false)); setLiquify(0) }} icon={'iconoir:cancel'} fontSize={34} className=" cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-center">
                <img src={data?.avatar} className="block sm:hidden w-[328px] h-[328px] sm:w-[497px] sm:h-[497px] rounded-[8px] mt-8" />
              </div>
              <div className="flex flex-wrap mt-[30px] justify-between gap-y-2 border-b border-[#666] pb-4">
                {dataItems.map((item, index) => (
                  <div key={index} className="w-[158px] sm:w-[188px] h-[83px] rounded-[8px] border-[#666] border flex flex-col items-start px-3 py-[11px]">
                    <p className="text-[14px] text-[#CCC] font-bold">{item.title}</p>
                    <p className="text-[18px] leading-5 text-[#FFF] font-bold">{item.description}</p>
                    <p className="text-[18px] text-[#CCC] font-semibold">{item.percentage}</p>
                  </div>
                ))}
              </div>
              <p className="text-[17px] sm:text-[18px] font-semibold text-[#FFF] mt-4 leading-[130%]">Do you want to get 1 $RENA embedded in this NFT? <br className="hidden sm:block" />Liquify NFT to retrieve your 1 $RENA</p>
              <button onClick={() => setLiquify(1)} className="mt-3 rounded-[4px] w-full sm:w-[200px] h-12 text-[17px] sm:text-[18px] text-[#121221] bg-[#FFF] font-bold">Liquify NFT</button>
            </div>
          </div>
        </div>
      }
      {/* {liquify == 2 &&
        < div className="relative w-[566px] h-[221px] bg-[#222] border-gray-light-3 rounded-[8px] p-6">
          <div className="flex flex-col w-full items-center">
            <p className="text-[26px] font-semibold leading-[130%]">Sign transaction in wallet</p>
            <p className="text-[18px] font-semibold mt-10">Please sign the transaction in your wallet</p>
            <SecondaryButton onClick={() => { dispatch(toggleItemModal(false)); setLiquify(0) }} className="!font-bold w-[203px] h-12 mt-6">Cancel</SecondaryButton>
          </div>
        </div>
      } */}
      {liquify == 2 &&
        < div style={{ backgroundImage: `url("/renegades/bg-modal-success.png")`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="relative w-full sm:w-[566px] h-[622px] sm:h-[425px] bg-[#222] border-gray-light-3 rounded-[8px] p-6 overflow-y-scroll">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">Success!</p>
              <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                <Icon onClick={() => { dispatch(toggleItemModal(false)); setLiquify(0) }} icon={'iconoir:cancel'} fontSize={34} className=" cursor-pointer" />
              </div>
            </div>
            <div className={`flex flex-col items-center justify-between mt-[83px] sm:mt-10`} >
              <div className="flex flex-col items-center">
                <img src="/renegades/rena.svg" className="w-[88px] h-[88px]" />
                <p className="text-[26px] font-bold mt-1" >1 $RENA</p>
                <p className="text-[22px] font-bold mt-3 leading-[24px] text-center " >Hooray! You’ve got your $RENA back!</p>
                <p className="text-[18px] font-semibold text-center" >If you want you can use it to claim a new Renegades NFT!</p>
              </div>
              <SecondaryButton onClick={() => { dispatch(toggleItemModal(false)); setLiquify(0) }} className="!font-bold w-[203px] h-12 mt-14">Great!</SecondaryButton>
            </div>
          </div>
        </div>
      }
    </div >
  );
};

export default ItemModal;
