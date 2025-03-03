import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  APTOS,
  CLAIM,
  LIQUID_COIN_OBJECT_MAINNET,
  RENA_COIN_TYPE_MAINNET,
  RENA_MODULE_MAINNET,
} from "../util/module-endpoints";
import { useDispatch } from "react-redux";
import { updateLRDLoading, updateLastRenegadesData } from "../state/renegades";

const useClaim = () => {
  const { signAndSubmitTransaction } = useWallet();
  const dispatch = useDispatch();

  const claim = async (accountAddress: string, count: number) => {
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_MODULE_MAINNET}::${CLAIM}`,
        typeArguments: [RENA_COIN_TYPE_MAINNET],
        functionArguments: [LIQUID_COIN_OBJECT_MAINNET, count],
      },
    });
    console.log(res);

    if (res.hash) {
      dispatch(updateLRDLoading(true));
      const result = await APTOS.waitForTransaction({
        transactionHash: res.hash,
      });

      const tokenObject: any = result.changes.filter(
        (change: any) =>
          change.data && change.data.type === "0x4::token::Token",
      )[0];
      const tokenObjectForName: any = result.changes.filter(
        (change: any) =>
          change.data && change.data.type === "0x4::token::TokenIdentifiers",
      )[0];
      const address = tokenObject.address;
      const uri = tokenObject.data.data.uri;
      const value = tokenObjectForName.data.data.name.value;

      console.log(address, uri, value);
      dispatch(
        updateLastRenegadesData({
          token_data_id: address,
          token_name: value,
          token_uri: uri,
          token_count: count,
        }),
      );
    }
  };

  return claim;
};

export default useClaim;
