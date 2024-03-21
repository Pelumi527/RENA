import Footer from "../../components/footer";
import Header from "../../components/header";
import PrimaryButton from "../../components/primaryButton";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import RenegadesItem from "./renegadesItem";
import { useDispatch } from "react-redux";
import { toggleClaimModal, toggleItemModal } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Events } from "../../api/events";
import { Network } from "aptos";
import { updateRenegadesData } from "../../state/renegades";
import { fetchGraphQL } from "../../util/url";
import { COLLECTION_ID, ONE_RENEGADES, RENA_COIN_TYPE_TESTNET, aptos } from "../../util/module-endpoints";
import { Aptos, AptosConfig, ViewRequest } from "@aptos-labs/ts-sdk";

const Renegades = () => {
  const { connected, account } = useWallet();
  const dispatch = useDispatch();
  const renegadesData = useAppSelector(state => state.renegadesState.renegadesData);
  const [renaBalance, setRenaBalance] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      if (account) {
        try {
          const operationsDoc = `
              query MyQuery($collectionId: String!, $ownerAddress: String!) {
                current_token_datas_v2(
                  where: {
                    current_collection: {
                      collection_id: {_eq: $collectionId}
                    },
                    current_token_ownership: {
                      owner_address: {_eq: $ownerAddress}
                    }
                  }
                ) {
                  token_name
                  token_standard
                  token_uri
                }
              }
            `;
          const res = await fetchGraphQL(operationsDoc, "MyQuery", {
            collectionId: COLLECTION_ID,
            ownerAddress: account.address,
          });
          console.log("collections", res);
          const collections = res.data.current_token_datas_v2;
          dispatch(updateRenegadesData(collections))
        } catch (error) {
          console.error(error);
        }
      }

      const payload: ViewRequest = {
        function: "0x1::coin::balance",
        typeArguments: [RENA_COIN_TYPE_TESTNET],
        functionArguments: [account?.address],
      };
      const res = await aptos.view({
        payload
      });
      setRenaBalance(parseInt(res[0] as any) / ONE_RENEGADES)
    };
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
              <p className="text-[26px] text-primary font-bold ml-3 mr-2">{connected ? renaBalance : 0}</p>
              <img src="/renegades/rena.svg" className="mr-1" />
            </div>
          </div>
          <div onClick={() => dispatch(toggleClaimModal(true))} className={`flex h-[110px] items-center cursor-pointer justify-center ${connected ? 'bg-primary hover:bg-primary-hover' : 'bg-[#222]'} border-2 rounded-[8px] mt-10`} style={{ backgroundImage: `url("/renegades/second.png")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 80px center', backgroundSize: 'contain' }}>
            <div className="flex items-center">
              {connected ?
                <>
                  <p className="font-medium text-[22px] sm:text-[26px]">You can claim  <span className="font-bold ">2 NFTs</span></p>
                  <Icon icon={'mingcute:right-line'} fontSize={25} />
                </>
                :
                <div className="flex flex-col items-center">
                  <p className="font-medium text-[22px] sm:text-[26px]">You don’t have any Renegades to claim</p>
                  <p className="text-[22px] sm:text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">Get $RENA to claim NFTs</p>
                </div>
              }
            </div>
          </div>
          {connected ?
            <div className="flex mt-[48px] sm:mt-[58px] gap-4 sm:gap-8 flex-wrap mb-[104px] sm:mb-[297px]">
              {renegadesData.map((item, index) => (
                <RenegadesItem onClick={() => dispatch(toggleItemModal(item))} key={index} avatar={item.token_uri} name={item.token_name} rank={""} level={1} />
              ))}
            </div>
            :
            <div className="flex flex-col mt-[120px] mb-[219px] items-center w-full">
              <img src="/renegades/avatar-default.png" className="w-[140px] h-[140px] rounded-lg" />
              <p className="text-[26px] my-[24px] text-center">You don’t have any Renegades in your wallet</p>
              <p className="text-[26px] font-semibold text-primary hover:text-primary-hover active:text-primary-active">Get $RENA to get NFTs</p>
              <p className="text-[26px]">or</p>
              <p className="text-[26px]">Get them on marketplaces</p>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Renegades;