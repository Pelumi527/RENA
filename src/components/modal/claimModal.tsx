import { Icon } from "@iconify/react";
import { toggleClaimModal } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useTokenList from "../../hook/useTokenList";
import useTokenBalance from "../../hook/useTokenBalance";
import useClaim from "../../hook/useClaim";
import LoadingImageClaim from "../loadingImageClaim";
import { RenegadeItemWithRarity, calculateRankings, getRankForRenegadeItem, getRaritiesForRenegadeItem, levelClass } from "../../util/renegadeUtils";

const ClaimModal = () => {
  const updateTokenList = useTokenList();
  const updateTokenBalance = useTokenBalance();
  const claim = useClaim();

  const isOpen = useAppSelector((state) => state.dialogState.bClaimModal);
  const lastRenegadesData = useAppSelector((state) => state.renegadesState.lastRenegadesData);
  const isLRDLoading = useAppSelector((state) => state.renegadesState.isLRDLoading);

  const [proceed, setProceed] = useState(0);
  const dispatch = useAppDispatch();
  const { account } = useWallet();
  const renaBalance = useAppSelector(state => state.renegadesState.renaBalance);

  const [count, setCount] = useState(1);
  const [currentRank, setCurrentRank] = useState<number | undefined>(undefined);
  const [renegadesWithRarity, setRenegadesWithRarity] = useState<RenegadeItemWithRarity[]>([]);
  const renegades: RenegadeItemWithRarity[] = require('../../metadata.json');

  useEffect(() => {
    const calculateAndSetRaritiesAndRankings = () => {
      const itemsWithCalculatedRarities = renegades.map(renegade => {
        const rarities = getRaritiesForRenegadeItem(renegades, renegade.name);
        return {
          ...renegade,
          overallRarity: rarities.overallRarity,
        };
      });
      const rankedItems = calculateRankings(itemsWithCalculatedRarities);
      setRenegadesWithRarity(rankedItems);
    };
    calculateAndSetRaritiesAndRankings();
  }, [renegades]);

  useEffect(() => {
    if (lastRenegadesData?.token_name && renegadesWithRarity.length > 0) {
      setCurrentRank(getRankForRenegadeItem(lastRenegadesData?.token_name, renegadesWithRarity));
    }
  }, [lastRenegadesData, renegadesWithRarity]);

  const incrementValue = () => {
    if (renaBalance > count) {
      setCount((prevValue) => prevValue + 1);
    }
  };

  const decrementValue = () => {
    if (1 < count) {
      setCount((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
    }
  };

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

  const onClose = async () => {
    dispatch(toggleClaimModal(false));
    setProceed(0);
    setCount(1);
  }

  const onClaim = async () => {
    if (account) {
      try {
        await claim(account.address, Math.floor(count));
        fetchEvents();
        setProceed(proceed + 1);
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
      <div style={{ backgroundImage: `url("/renegades/bg-model.png")`, backgroundPosition: 'top 65px center', backgroundRepeat: 'no-repeat' }} className="custom-background-position relative w-full sm:w-[566px] h-[95%] sm:h-fit bg-[#222] border-gray-light-3 rounded-t-[8px] sm:rounded-[8px] py-4 px-6">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <p className="text-[26px] font-semibold text-[#FFF] leading-[130%]">{proceed == 0 ? 'Claim a Renegade' : 'You’ve got a new Renegade!'}</p>
            <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
              <Icon onClick={onClose} icon={'iconoir:cancel'} fontSize={34} className=" cursor-pointer" />
            </div>
          </div>
          <div className={`flex flex-col items-center justify-between mt-8`} >
            <div className="flex flex-col items-center relative">
              {proceed > 0 || isLRDLoading ?
                <>
                  <LoadingImageClaim url={lastRenegadesData?.token_uri} className="w-[194px] h-[194px] rounded-[8px] mt-2" />
                  <p className="text-[26px] font-semibold mt-1" >{lastRenegadesData?.token_name}</p>
                  <div className={`leading-[130%] text-[18px] font-bold flex items-center justify-center ${currentRank && levelClass(currentRank)}`}>
                    <Icon icon={'ph:medal-fill'} fontSize={20} className={`mr-1 ${currentRank && levelClass(currentRank)}`} />
                    Rank {currentRank}
                    <p className="text-[#666] font-semibold">/5000</p>
                  </div>
                  {lastRenegadesData?.token_count && lastRenegadesData?.token_count > 1 &&
                    <div className="absolute -right-[60px] -top-[16px] bg-primary border-2 border-[#FFF] w-[123px] h-[46px] rounded-[8px] flex items-center justify-center text-[22px] font-semibold">+ {lastRenegadesData?.token_count - 1} more</div>
                  }
                </>
                :
                <img src='/renegades/avatar-default.svg' className="w-[194px] h-[194px] rounded-[8px]" />
              }
            </div>
            {Math.floor(renaBalance) > 0 &&
              <>
                <div className="flex h-12 justify-center gap-4 items-center mt-9">
                  <div
                    className={`w-[72px] h-full ${count <= 1 ? 'bg-primary-disable' : 'bg-primary'}  rounded-[4px] flex items-center justify-center cursor-pointer`}
                    onClick={decrementValue}
                  >
                    <Icon icon={'fa6-solid:minus'} fontSize={24} color="black" />
                  </div>
                  <input
                    type="text"
                    value={Math.floor(count)}
                    onChange={(e) => { renaBalance < Number(e.target.value) ? setCount(renaBalance) : setCount(Number(e.target.value)) }}
                    className="w-[95px] h-full text-center rounded-[4px] border bg-[#FFF] bg-opacity-10 hover:bg-opacity-20 border-transparent focus:outline-none focus:border-gray-300"
                  />

                  <div
                    className={`w-[72px] h-full ${renaBalance <= count ? 'bg-primary-disable' : 'bg-primary'} rounded-[4px] flex items-center justify-center cursor-pointer`}
                    onClick={incrementValue}
                  >
                    <Icon icon={'fa6-solid:plus'} fontSize={24} color="black" />
                  </div>
                </div>
                <div className="flex items-center justify-center text-[18px] font-semibold gap-1 mt-3">
                  <p>You can claim max</p><span onClick={() => setCount(renaBalance)} className="text-primary cursor-pointer">{(Math.floor(renaBalance) as number)} Renegades</span>
                </div>
              </>
            }
            <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6 mt-8 mb-2 w-full">
              {Math.floor(renaBalance) > 0 && <PrimaryButton onClick={onClaim} className="block sm:hidden !font-bold text-[18px] w-full sm:w-[203px] h-12">Claim Renegade{count > 1 && 's'}</PrimaryButton>}
              {Math.floor(renaBalance) > 0 ?
                <SecondaryButton onClick={onClose} className="!font-bold w-full sm:w-[203px] h-12">Close </SecondaryButton>
                :
                <SecondaryButton onClick={onClose} className="!font-bold w-full sm:w-[203px] h-12">Great!</SecondaryButton>
              }
              {Math.floor(renaBalance) > 0 && <PrimaryButton onClick={onClaim} className="hidden sm:block !font-bold text-[18px] w-full sm:w-[203px] !h-12">Claim Renegade{count > 1 && 's'}</PrimaryButton>}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ClaimModal;
