import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { toggleItemModal } from "../../state/dialog";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useLiquify from "../../hook/useLiquify";
import useTokenList from "../../hook/useTokenList";
import useTokenBalance from "../../hook/useTokenBalance";
import PrimaryButton from "../primaryButton";
import SecondaryButton from "../secondaryButton";
import { Icon } from "@iconify/react";
import Cookies from 'js-cookie';

import {
  RenegadeItemWithRarity,
  calculateRankings,
  getRankForRenegadeItem,
  getRaritiesForRenegadeItem,
  levelClass
} from '../../util/renegadeUtils';
import Checkbox from '../checkBox';
import { updateRefresh } from '../../state/global';

const LiquifyModal = () => {
  const dispatch = useAppDispatch();
  const { account } = useWallet();
  const liquify = useLiquify();
  const updateTokenList = useTokenList();
  const updateTokenBalance = useTokenBalance();
  const data = useAppSelector((state) => state.dialogState.bItemModal);
  const [isChecked, setIsChecked] = useState(false);
  const [proceed, setProceed] = useState(0);
  const [skip, setSkip] = useState(false);
  const [renegadesWithRarity, setRenegadesWithRarity] = useState<RenegadeItemWithRarity[]>([]);
  const [traitRarities, setTraitRarities] = useState<Record<string, any>>({});
  const [overallRarity, setOverallRarity] = useState<number>(0);
  const [currentRank, setCurrentRank] = useState<number | undefined>(undefined);

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
    if (data[0]?.token_name) {
      setCurrentRank(getRankForRenegadeItem(data[0]?.token_name, renegadesWithRarity));
    }
  }, [data, renegadesWithRarity]);

  useEffect(() => {
    if (data[0]?.token_name) {
      try {
        const rarities = getRaritiesForRenegadeItem(renegades, data[0].token_name);
        setTraitRarities(rarities.traitRarities);
        setOverallRarity(rarities.overallRarity);
      } catch (error) {
        console.error("Error calculating rarities:", error);
      }
    }
  }, [data, renegades]);

  const dataItems = React.useMemo(() => {
    return Object.entries(traitRarities).map(([traitType, [rarityScore, value]]) => ({
      title: traitType,
      description: value,
      percentage: rarityScore.toFixed(2)
    }));
  }, [traitRarities]);

  useEffect(() => {
    const dontShowAgain = Cookies.get('dontShowAgain');
    console.log("dontShowAgain", dontShowAgain);
    if (dontShowAgain === 'true') {
      setSkip(true);
    }
  }, []);

  const toggleCheckbox = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    if (newIsChecked) {
      Cookies.set('dontShowAgain', 'true', { expires: 365 });
    } else {
      Cookies.remove('dontShowAgain');
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

  const onLiqify = async () => {
    if (account) {
      try {
        await liquify(account.address, data.map((item: { token_data_id: string; }) => item.token_data_id));
        fetchEvents();
        setProceed(2);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const animationClass = data.length > 0 ? "animate-slideInUp" : "animate-slideInDown";

  return (
    <div
      className={`${data.length > 0 && "block"
        } ${animationClass} fixed z-[100] inset-0 h-full flex justify-center items-end sm:items-center bg-gray-dark-1`}
    >
      {proceed == 1 || data.length > 1 ? proceed != 2 && (
        <div className="overflow-y-scroll relative w-full sm:w-[566px] h-[425px] sm:h-[510px] bg-[#222] border-gray-light-3 rounded-[8px] p-4">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">
                Proceed and liquify {data.length > 1 ? "NFTs" : data[0]?.token_name}?
              </p>
              <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                <Icon
                  onClick={() => {
                    dispatch(toggleItemModal([]));
                    setProceed(0);
                  }}
                  icon={"iconoir:cancel"}
                  fontSize={34}
                  className=" cursor-pointer"
                />
              </div>
            </div>
            <div className="flex my-8 sm:my-12 items-center justify-center relative">
              {data.length > 1 &&
                <div className="absolute -top-[16px] bg-primary border-2 border-[#FFF] w-[123px] h-[46px] rounded-[8px] flex items-center justify-center text-[22px] font-semibold">+ {data.length - 1} more</div>
              }
              <img
                src={data[0]?.token_uri}
                className="w-[150px] h-[150px] rounded-[8px]"
              />
              <Icon
                icon={"solar:arrow-right-bold-duotone"}
                fontSize={34}
                className="text-primary ml-9 mr-[22px]"
              />
              <div className='flex flex-col'>
                <img src="/renegades/rena.svg" className="w-[88px] h-[88pxpx]" />
                <p className='text-[20px] font-semibold text-center mt-2'>$RENA</p>
              </div>
            </div>
            <p className="text-[18px] font-semibold text-[#FFF] leading-[130%] text-center">
              If you proceed you will lose the NFT{data.length > 1 && "s"}, send {data.length > 1 ? "them" : "it"} back to the NFT pool
              and get {data.length > 1 ? "" : 1} $RENA. Are you sure you want to proceed?
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 my-6 items-center w-full sm:flex-row flex-col">
              <PrimaryButton
                onClick={onLiqify}
                className="block sm:hidden !font-bold w-full sm:w-[253px] h-12"
              >
                Liquify NFT and get 1 $RENA
              </PrimaryButton>
              <SecondaryButton
                onClick={() => {
                  dispatch(toggleItemModal([]));
                  setProceed(0);
                }}
                className="!font-bold w-full sm:w-[203px] h-12"
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={onLiqify}
                className="hidden sm:block !font-bold w-full sm:w-[253px] !h-12"
              >
                Liquify {data.length > 1 && data.length} NFT{data.length > 1 && "s"} and get {data.length <= 1 && "1 "}$RENA
              </PrimaryButton>
            </div>
            <div className="flex items-center justify-center">
              <Checkbox
                isChecked={isChecked}
                onToggle={toggleCheckbox}
              />
              <p
                className="text-lg h-[25px] ml-1 font-semibold cursor-pointer"
                onClick={toggleCheckbox}
              >
                Don’t show this dialog again
              </p>
            </div>
          </div>
        </div>
      ) : ""}
      {proceed == 0 && data.length <= 1 && (
        <div className="relative w-full sm:w-[965px] h-[95%] sm:h-fit bg-[#222] border-gray-light-3 rounded-[8px] py-6 px-4 sm:px-6 overflow-y-scroll">
          <div className="flex w-full justify-between">
            <img
              src={data[0]?.token_uri}
              className="hidden sm:block w-[328px] h-[328px] sm:w-[497px] sm:h-[497px] rounded-lg"
            />
            <div className="flex flex-col w-[388px]">
              <div className="flex justify-between h-[62px]">
                <div className="flex flex-col items-start">
                  <p className="text-[32px] font-bold leading-[38px]">
                    {data[0]?.token_name}
                  </p>
                  <div className={`leading-[130%] text-[18px] font-bold flex items-center justify-center mb-[297px] ${currentRank && levelClass(currentRank)}`}>
                    <Icon icon={'ph:medal-fill'} fontSize={20} className={`mr-1 ${currentRank && levelClass(currentRank)}`} />
                    Rank {currentRank}
                    <p className="text-[#666] font-semibold">/5000</p>
                  </div>
                </div>
                <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                  <Icon
                    onClick={() => {
                      dispatch(toggleItemModal([]));
                      setProceed(0);
                    }}
                    icon={"iconoir:cancel"}
                    fontSize={34}
                    className=" cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={data[0]?.token_uri}
                  className="block sm:hidden w-full sm:w-[497px] sm:h-[497px] rounded-lg mt-8"
                />
              </div>
              <div className="mt-[30px] border-b border-[#666] pb-4">
                {dataItems.length > 0 && (
                  <div className="flex flex-wrap gap-y-2 justify-between">
                    {dataItems.map((item, index) => (
                      <div
                        key={index}
                        className="w-[158px] sm:w-[188px] h-[110px] rounded-[8px] border-[#666] border flex flex-col items-start px-3 py-[11px]"
                      >
                        <p className="text-[14px] text-[#CCC] font-bold">
                          {item.title}
                        </p>
                        <p className="text-[18px] leading-5 text-[#FFF] font-bold">
                          {item.description}
                        </p>
                        <p className="text-[18px] text-[#CCC] font-semibold">{item.percentage + "%"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[17px] sm:text-[18px] font-semibold text-[#FFF] mt-4 leading-[130%]">
                Do you want to get 1 $RENA embedded in this NFT?{" "}
                <br className="hidden sm:block" />
                Liquify NFT to retrieve your 1 $RENA
              </p>
              <button
                onClick={() => skip ? onLiqify() : setProceed(1)}
                className="mt-3 rounded-[4px] w-full sm:w-[200px] h-12 text-[17px] sm:text-[18px] text-[#121221] bg-[#FFF] font-bold"
              >
                Liquify NFT
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {proceed == 2 &&
        < div className="relative w-[566px] h-[221px] bg-[#222] border-gray-light-3 rounded-[8px] p-6">
          <div className="flex flex-col w-full items-center">
            <p className="text-[26px] font-semibold leading-[130%]">Sign transaction in wallet</p>
            <p className="text-[18px] font-semibold mt-10">Please sign the transaction in your wallet</p>
            <SecondaryButton onClick={() => { dispatch(toggleItemModal(false)); setLiquify(0) }} className="!font-bold w-[203px] h-12 mt-6">Cancel</SecondaryButton>
          </div>
        </div>
      } */}
      {proceed == 2 && (
        <div
          style={{
            backgroundImage: `url("/renegades/bg-modal-success.png")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative w-full sm:w-[566px] h-[522px] sm:h-[425px] bg-[#222] border-gray-light-3 rounded-[8px] px-6 py-4 overflow-y-scroll sm:overflow-hidden"
        >
          <div className="flex flex-col w-full mb-6">
            <div className="flex justify-between items-center">
              <p className="text-[26px] font-semibold text-[#FFF] leading-[30px]">
                Success!
              </p>
              <div className="flex justify-center items-center bg-[#000] bg-opacity-0 hover:bg-opacity-50 rounded-full w-12 h-12">
                <Icon
                  onClick={() => {
                    dispatch(updateRefresh(true));
                    dispatch(toggleItemModal([]));
                    setProceed(1);
                  }}
                  icon={"iconoir:cancel"}
                  fontSize={34}
                  className=" cursor-pointer"
                />
              </div>
            </div>
            <div
              className={`flex flex-col items-center justify-between mt-[83px] sm:mt-10`}
            >
              <div className="flex flex-col items-center">
                <img src="/renegades/rena.svg" className="w-[88px] h-[88px]" />
                <p className="text-[26px] font-bold mt-1">{data.length} $RENA</p>
                <p className="text-[22px] font-bold mt-3 leading-[24px] text-center ">
                  Hooray! You’ve got your $RENA back!
                </p>
                <p className="text-[18px] font-semibold text-center">
                  If you want you can use {data.length > 1 ? "them" : "it"} to claim {data.length > 1 ? "" : "a"} new Renegades NFT{data.length > 1 && "s"}!
                </p>
              </div>
              <SecondaryButton
                onClick={() => {
                  dispatch(updateRefresh(true));
                  dispatch(toggleItemModal([]));
                  setProceed(1);
                }}
                className="!font-bold w-[203px] h-12 mt-14"
              >
                Great!
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiquifyModal;
