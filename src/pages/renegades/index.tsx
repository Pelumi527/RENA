import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Icon } from "@iconify/react";
import RenegadesItem from "./renegadesItem";
import { useDispatch } from "react-redux";
import { toggleClaimModal, toggleItemModal } from "../../state/dialog";
import { useAppSelector } from "../../state/hooks";
import useTokenList from "../../hook/useTokenList";
import useTokenBalance from "../../hook/useTokenBalance";
import useClaim from "../../hook/useClaim";

const Renegades = () => {
  const { connected, account } = useWallet();
  const dispatch = useDispatch();
  const updateTokenList = useTokenList();
  const updateTokenBalance = useTokenBalance();
  const claim = useClaim();

  const renegadesData = useAppSelector(
    (state) => state.renegadesState.renegadesData
  );
  const renaBalance = useAppSelector(
    (state) => state.renegadesState.renaBalance
  );

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

  useEffect(() => {
    fetchEvents();
  }, [connected, account]);

  return (
    <div className="parallax relative" id="cred-point">
      <img src="/renegades/vector.png" className="absolute sm:left-20" />
      <Header className="" active={1} />
      <div className="w-full flex flex-col z-20 relative items-center">
        <div className="flex flex-col w-[90%] sm:w-[1100px]">
          <div className="mt-12 flex sm:flex-row flex-col justify-between sm:h-[47px] sm:items-end">
            <p className="font-bold text-[42px]">My Renegades</p>
            <div className="flex items-center">
              <p className="text-[26px] font-semibold">$RENA Balance:</p>
              <p className="text-[26px] text-primary font-bold ml-3 mr-2">
                {renaBalance != 0 ? renaBalance : 0}
              </p>
              <img src="/renegades/rena.svg" className="mr-1" />
            </div>
          </div>
          <div
            onClick={() => { renaBalance != 0 && dispatch(toggleClaimModal(true)) }}
            className={`flex h-[110px] items-center cursor-pointer justify-center ${renaBalance != 0
              ? "bg-primary hover:bg-primary-hover"
              : "bg-[#222]"
              } border-2 rounded-[8px] mt-10`}
            style={{
              backgroundImage: `url("/renegades/second.png")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 80px center",
              backgroundSize: "contain",
            }}
          >
            <div className="flex items-center">
              {renaBalance != 0 ? (
                <>
                  <p className="font-medium text-[22px] sm:text-[26px]">
                    You can claim{" "}
                    <span className="font-bold ">{renaBalance} NFT {renaBalance > 1 && "s"}</span>
                  </p>
                  <Icon icon={"mingcute:right-line"} fontSize={25} />
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="font-medium text-[22px] sm:text-[26px] text-center">
                    You don’t have any Renegades to claim
                  </p>
                  <p className="text-[22px] sm:text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">
                    Get $RENA to claim NFTs
                  </p>
                </div>
              )}
            </div>
          </div>
          {connected ? (
            <div className="flex mt-[48px] sm:mt-[58px] gap-4 sm:gap-8 flex-wrap mb-[104px] sm:mb-[297px]">
              {renegadesData.map((item, index) => (
                <RenegadesItem
                  onClick={() => dispatch(toggleItemModal(item))}
                  key={index}
                  avatar={item.token_uri}
                  name={item.token_name}
                  rank={""}
                  level={1}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col mt-[120px] mb-[219px] items-center w-full">
              <img
                src="/renegades/avatar-default.png"
                className="w-[140px] h-[140px] rounded-lg"
              />
              <p className="text-[26px] my-[24px] text-center">
                You don’t have any Renegades in your wallet
              </p>
              <p className="text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">
                Get $RENA to get NFTs
              </p>
              <p className="text-[26px]">or</p>
              <p className="text-[26px]">Get them on marketplaces</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Renegades;
