import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import RenegadesItem from "../renegades/renegadesItem";
import { useAppSelector } from "../../state/hooks";
import { useDispatch } from "react-redux";
import { toggleItemModal, toggleStakingModal } from "../../state/dialog";
import { NFTtype } from "../../type/renegades";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import PrimaryButton from "../../components/primaryButton";
import Cookies from "js-cookie";
import useLiquify from "../../hook/useLiquify";
import StakingModal from "../../components/modal/stakingModal";
import { useUserRenegadesData } from "../../hook/useTokenList";
import { updateRenegadesData } from "../../state/renegades";
import { useRenegadeRankData, useRenegadesRankStakedToken } from "../../hook";
import { log } from "console";

enum PAGE_VIEW {
  STAKED,
  UNSTAKED,
}

const Staking = () => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState<NFTtype[]>([]);
  const [skip, setSkip] = useState(false);
  const [pageView, setPageView] = useState<PAGE_VIEW>(PAGE_VIEW.STAKED);
  const { connected, account } = useWallet();
  const liquify = useLiquify();
  const isBalanceLoading = useAppSelector(
    (state) => state.renegadesState.isBalanceLoading
  );
  const toggleItemSelection = (itemId: NFTtype) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };
  const updateCookie = () => {
    const dontShowAgain = Cookies.get("dontShowAgain");
    console.log("dontShowAgain", dontShowAgain);
    if (dontShowAgain === "true") {
      setSkip(true);
    }
  };

  const renegadesRankData = useRenegadeRankData({
    accountAddress: account?.address,
  }).data;

  const renegadesRankStakedData = useRenegadesRankStakedToken({
    accountAddress: account?.address,
  }).data;



  const openStakingModal = () => {
    dispatch(toggleStakingModal(true));
    dispatch(toggleItemModal(selectedItems));
    setSelectedItems([]);
  };

  const onLiqify = async () => {
    if (account) {
      try {
        await liquify(
          account.address,
          selectedItems.map((item) => item.token_data_id as string)
        );
        //fetchEvents();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <main className="relative parallax" id="cred-point">
      <img src="/renegades/vector.png" className="absolute sm:left-20" />
      <Header className="" active={2} />
      <div className="relative px-40">
        <div className="flex justify-between">
          <h1 className="text-[42px] font-bold">Staking</h1>
          <div className="flex justify-evenly items-center w-[60%]">
            <div className="flex items-center justify-center">
              <h1 className="text-[26px] font-semibold  mr-4">Total Staked:</h1>
              <span className="text-[26px] text-primary font-bold">{renegadesRankStakedData?.length}</span>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-[26px] font-semibold  mr-4">Earning:</h1>
              <span className="text-[26px] text-primary font-bold">
                0 pts/day
              </span>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-[26px] font-semibold mr-4">Total earned:</h1>
              <span className="text-[26px] text-primary font-bold">0 pts</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full h-screen mt-4">
          <div className="w-full">
            <TabGroup>
              <TabList className="flex items-center justify-center">
                <Tab
                  onClick={() => {
                    setPageView(PAGE_VIEW.STAKED);
                  }}
                  className="px-12 py-2 text-lg font-bold border-2 border-r-0 border-secondary rounded-s focus:outline-none data-[selected]:bg-primary data-[selected]:text-gray-dark-1"
                >
                  STAKED
                </Tab>
                <Tab
                  onClick={() => {
                    setPageView(PAGE_VIEW.UNSTAKED);
                  }}
                  className="px-12 py-2 -ml-2 text-lg font-bold border-2 border-l-0 border-secondary rounded-s focus:outline-none data-[selected]:bg-primary data-[selected]:text-gray-dark-1"
                >
                  UNSTAKED
                </Tab>
              </TabList>
              <TabPanels className="mt-10">
                <TabPanel>
                  {renegadesRankStakedData && renegadesRankStakedData?.length > 0 ? (
                    <div className="flex mt-[48px] sm:mt-[58px] z-10 gap-4 sm:gap-8 flex-wrap mb-[104px] sm:mb-[297px]">
                      {renegadesRankStakedData.map((item, index) => (
                        <RenegadesItem
                          onClick={() => {}}
                          key={index}
                          index={index}
                          avatar={(item?.token_uri as string).replace(
                            /["']/g,
                            ""
                          )}
                          name={item.token_name}
                          rank={item?.rank}
                          isSelected={
                            !!item?.token_data_id && selectedItems.includes(item)
                          }
                          onToggleSelected={() =>
                            item.token_data_id
                              ? toggleItemSelection(item)
                              : undefined
                          }
                          isStaking={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col mt-[120px] mb-[219px] items-center w-full`}
                    >
                      {connected && !isBalanceLoading && (
                        <>
                          <img
                            src="/renegades/avatar-default.png"
                            className="w-[140px] h-[140px] rounded-lg"
                          />
                          <p className="text-[26px] my-[24px] text-center">
                            You don’t have any Renegades in your wallet
                          </p>
                          {/* <p className="text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">
                    <Link to={"/presale"}>Get $RENA to get NFTs</Link>
                  </p> */}
                          <p className="text-[26px]">or</p>
                          <p className="text-[26px]">
                            Get them on marketplaces
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </TabPanel>
                <TabPanel>
                  {renegadesRankData && renegadesRankData.length > 0 ? (
                    <div className="flex mt-[48px] sm:mt-[58px] z-10 gap-4 sm:gap-8 flex-wrap mb-[104px] sm:mb-[297px]">
                      {renegadesRankData.map(
                        (item, index) => (
                          console.log(item),
                          "itennn",
                          (
                            <RenegadesItem
                              onClick={() => dispatch(toggleItemModal([item]))}
                              key={index}
                              index={index}
                              avatar={(item.token_uri as string).replace(
                                /["']/g,
                                ""
                              )}
                              name={item.token_name}
                              rank={item?.rank}
                              isSelected={
                                !!item.token_data_id &&
                                selectedItems.includes(item)
                              }
                              onToggleSelected={() =>
                                item.token_data_id
                                  ? toggleItemSelection(item)
                                  : undefined
                              }
                            />
                          )
                        )
                      )}
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col mt-[120px] mb-[219px] items-center w-full`}
                    >
                      {connected && !isBalanceLoading && (
                        <>
                          <img
                            src="/renegades/avatar-default.png"
                            className="w-[140px] h-[140px] rounded-lg"
                          />
                          <p className="text-[26px] my-[24px] text-center">
                            You don’t have any Renegades in your wallet
                          </p>
                          {/* <p className="text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">
                    <Link to={"/presale"}>Get $RENA to get NFTs</Link>
                  </p> */}
                          <p className="text-[26px]">or</p>
                          <p className="text-[26px]">
                            Get them on marketplaces
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
      {selectedItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 bg-[#222] h-20 text-white p-4 sm:gap-10 flex justify-center items-center shadow-md z-50">
          <button
            className="py-2 pr-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 sm:pr-0 sm:px-4"
            onClick={() => setSelectedItems([])}
          >
            Deselect all
          </button>
          <button
            className={`${
              renegadesRankData &&
              renegadesRankData.length == selectedItems.length &&
              "cursor-not-allowed text-[#c1c1c1]"
            } text-white font-bold py-2 pl-4 pr-6 sm:pr-0 sm:pl-0 sm:px-4 rounded`}
            onClick={() => setSelectedItems(renegadesRankData ?? [])}
          >
            Select all
          </button>
          <PrimaryButton
            onClick={() => (skip ? onLiqify() : openStakingModal())}
            className="w-[141px] sm:w-[176px] z-20 relative !font-bold !h-[48px]"
          >
            {pageView == PAGE_VIEW.STAKED ? "Unstake" : "Stake"}{" "}
            {selectedItems.length} NFT{selectedItems.length > 1 && "s"}
          </PrimaryButton>
        </div>
      )}
      <StakingModal isStaking={pageView == PAGE_VIEW.UNSTAKED} />
    </main>
  );
};

export default Staking;
