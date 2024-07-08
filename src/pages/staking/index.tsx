import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import RenegadesItem from "../renegades/renegadesItem";
import { useAppSelector } from "../../state/hooks";
import { useDispatch } from "react-redux";
import {
  toggleItemModal,
  toggleStakingModal,
  updateIsSigningTransaction,
  updateIsTransactionSuccess,
} from "../../state/dialog";
import { NFTtype } from "../../type/renegades";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import PrimaryButton from "../../components/primaryButton";
import Cookies from "js-cookie";
import StakingModal from "../../components/modal/stakingModal";
import {
  useRenegadeRankData,
  useRenegadesRankStakedToken,
  useUserRenaTotalStakePoint,
} from "../../hook";
import useStaking from "../../hook/useStaking";
import useUnStaking from "../../hook/useUnStaking";

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
  const stake = useStaking();
  const unStake = useUnStaking();
  const multistate = useAppSelector((state) => state.renegadesState.multistate);
  const data = useAppSelector((state) => state.dialogState.bItemModal);
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
  });

  const renegadesRankStakedData = useRenegadesRankStakedToken({
    accountAddress: account?.address,
  });

  const onStake = async () => {
    if (account) {
      try {
        dispatch(updateIsSigningTransaction(true));
        const response = await stake(
          account?.address,
          data.map((item: { token_data_id: string }) => item.token_data_id)
        );
        if (response?.success) {
          dispatch(updateIsSigningTransaction(false));
          dispatch(updateIsTransactionSuccess(true));
          renegadesRankData.refetch();
          renegadesRankStakedData.refetch();
        }
      } catch (error) {
        dispatch(updateIsSigningTransaction(false));
        dispatch(updateIsTransactionSuccess(false));
      }
    }
  };

  const onUnStake = async () => {
    if (account) {
      try {
        dispatch(updateIsSigningTransaction(true));
        const response = await unStake(
          account.address,
          data.map((item: { token_data_id: string }) => item.token_data_id)
        );
        if (response?.success) {
          dispatch(updateIsSigningTransaction(false));
          dispatch(updateIsTransactionSuccess(true));
          renegadesRankData.refetch();
          renegadesRankStakedData.refetch();
        }
      } catch (error) {
        dispatch(updateIsSigningTransaction(false));
        dispatch(updateIsTransactionSuccess(false));
      }
    }
  };

  const onStakeOrUnStake = async () => {
    if (pageView === PAGE_VIEW.STAKED) {
      await onUnStake();
    }
    if (pageView === PAGE_VIEW.UNSTAKED) {
      await onStake();
    }
  };

  const totalRenaStakePoint = useUserRenaTotalStakePoint({
    accountAddress: account?.address,
    tokenAddress: renegadesRankStakedData.data
      ? renegadesRankStakedData.data.map((data) => data.token_data_id)
      : [],
  });

  const openStakingModal = () => {
    dispatch(toggleStakingModal(true));
    dispatch(toggleItemModal(selectedItems));
    setSelectedItems([]);
  };

  useEffect(() => {
    updateCookie();
  }, [multistate]);

  return (
    <main className="relative parallax" id="cred-point">
      <img src="/renegades/vector.png" className="absolute sm:left-20" alt="background" />
      <Header className="" active={2} />
      <div className="relative px-[9px] md:px-10 lg:px-40 lg:mt-[50px]">
        <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
          <h1 className="text-[42px] font-bold">Staking</h1>
          <div className="lg:flex-row lg:justify-evenly lg:items-center lg:w-[60%] flex flex-col items-start justify-start">
            <div className="flex items-center justify-start lg:justify-center lg:item-center">
              <h1 className="text-[26px] font-semibold mr-4">Total Staked:</h1>
              <span className="text-[26px] text-primary font-bold">
                {renegadesRankStakedData.data?.length}
              </span>
            </div>
            <div className="flex items-center justify-start lg:justify-center">
              <h1 className="text-[26px] font-semibold mr-4">Earning:</h1>
              {renegadesRankStakedData.data?.length ? (
                <span className="text-[26px] text-primary font-bold">
                  {renegadesRankStakedData.data.length * 10}
                </span> 
              ) : <span className="text-[26px] text-primary font-bold">
                  0
                </span>}
            </div>
            <div className="flex items-center justify-start lg:justify-center">
              <h1 className="text-[26px] font-semibold mr-4">Total earned:</h1>
              <span className="text-[26px] text-primary font-bold">
                {totalRenaStakePoint.data} pts
              </span>
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
                    setSelectedItems([])
                  }}
                  className="px-12 py-2 text-lg font-bold border-[1px] border-r-0 border-secondary rounded-l-[4px] focus:outline-none data-[selected]:bg-primary data-[selected]:text-[#121221]"
                >
                  STAKED
                </Tab>
                <Tab
                  onClick={() => {
                    setPageView(PAGE_VIEW.UNSTAKED);
                    setSelectedItems([])
                  }}
                  className="px-12 py-2 text-lg font-bold border-[1px] border-l-0 border-secondary rounded-r-[4px] focus:outline-none data-[selected]:bg-primary data-[selected]:text-[#121221]"
                >
                  UNSTAKED
                </Tab>
              </TabList>
              <TabPanels className="mt-10">
                <TabPanel>
                  {renegadesRankStakedData.data &&
                  renegadesRankStakedData.data?.length > 0 ? (
                    <div className="grid grid-cols-2 mx-2 gap-y-8 mt-[58px] mb-[297px] md:gap-x-2 md:grid-cols-4 lg:mt-[48px] lg:grid-cols-5 lg:mb-[104px] lg:gap-8">
                      {renegadesRankStakedData.data.map((item, index) => (
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
                            !!item?.token_data_id &&
                            selectedItems.includes(item)
                          }
                          onToggleSelected={() =>
                            item.token_data_id
                              ? toggleItemSelection(item)
                              : undefined
                          }
                          isStaking={true}
                          renaAddress={item.token_data_id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col mt-[120px] mb-[219px] items-center w-full`}
                    >
                      {connected && !renegadesRankStakedData.isLoading && (
                        <>
                          <img
                            src="/renegades/avatar-default.png"
                            className="w-[140px] h-[140px] rounded-lg"
                            alt="default-avatar"
                          />
                          <p className="text-[26px] my-[24px] text-center">
                            You don’t have any staked Renegades
                          </p>
                           <a rel="noreferrer" href="https://liquidswap.com/#/" target="_blank" className="text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">
                            Get $RENA to get NFTs
                          </a>
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
                  {renegadesRankData.data &&
                  renegadesRankData.data.length > 0 ? (
                    <div className="grid grid-cols-2 mx-2 gap-y-8 mt-[58px] mb-[297px] md:gap-x-2 md:grid-cols-4 lg:mt-[48px] lg:grid-cols-5 lg:mb-[104px] lg:gap-8">
                      {renegadesRankData.data.map((item, index) => (
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
                            !!item.token_data_id && selectedItems.includes(item)
                          }
                          onToggleSelected={() =>
                            item.token_data_id
                              ? toggleItemSelection(item)
                              : undefined
                          }
                          renaAddress={item?.token_data_id}
                          isStaking={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col mt-[120px] mb-[219px] items-center w-full`}
                    >
                      {connected && !renegadesRankData.isLoading && (
                        <>
                          <img
                            src="/renegades/avatar-default.png"
                            className="w-[140px] h-[140px] rounded-lg"
                             alt="default-avatar"
                          />
                          <p className="text-[26px] my-[24px]  text-center">
                            You don’t have any Renegades in your wallet
                          </p>
                          <a rel="noreferrer" href="https://liquidswap.com/#/" target="_blank" className="text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">
                            Get $RENA to get NFTs
                          </a>
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
        <div className="fixed inset-x-0 bottom-0 bg-[#222] h-20 text-white p-4 sm:gap-10 flex justify-center items-center shadow-md z-[250]">
          <button
            className="py-2 pr-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 sm:pr-0 sm:px-4"
            onClick={() => setSelectedItems([])}
          >
            Deselect all
          </button>
          {pageView === PAGE_VIEW.UNSTAKED ? (
            <button
              className={`${
                renegadesRankData.data &&
                renegadesRankData.data.length === selectedItems.length &&
                "cursor-not-allowed text-[#c1c1c1]"
              } text-white font-bold py-2 pl-4 pr-6 sm:pr-0 sm:pl-0 sm:px-4 rounded`}
              onClick={() => setSelectedItems(renegadesRankData.data ?? [])}
            >
              Select all
            </button>
          ) : (
            <button
              className={`${
                renegadesRankStakedData.data &&
                renegadesRankStakedData.data.length === selectedItems.length &&
                "cursor-not-allowed text-[#c1c1c1]"
              } text-white font-bold py-2 pl-4 pr-6 sm:pr-0 sm:pl-0 sm:px-4 rounded`}
              onClick={() =>
                setSelectedItems(renegadesRankStakedData.data ?? [])
              }
            >
              Select all
            </button>
          )}

          <PrimaryButton
            onClick={() => (skip ? onStakeOrUnStake : openStakingModal())}
            className="w-[141px] sm:w-[176px] z-20 relative !font-bold !h-[48px]"
          >
            {pageView === PAGE_VIEW.STAKED ? "Unstake" : "Stake"}{" "}
            {selectedItems.length} NFT{selectedItems.length > 1 && "s"}
          </PrimaryButton>
        </div>
      )}
      <StakingModal isStaking={pageView === PAGE_VIEW.UNSTAKED} />
    </main>
  );
};

export default Staking;
