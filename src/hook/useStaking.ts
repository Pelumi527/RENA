import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  APTOS,
  LIQUID_COIN_OBJECT_MAINNET,
  LIQUIFY_WITH_ADDRESS,
  RENA_COIN_TYPE_MAINNET,
  RENA_MODULE_MAINNET,
  RENA_STAKING_TESTNET,
  STAKE,
} from "../util/module-endpoints";
import { updateRefresh } from "../state/global";
import { useDispatch } from "react-redux";

const useStaking = () => {
  const { signAndSubmitTransaction } = useWallet();
  const dispatch = useDispatch();
  const stake = async (accountAddress: string, tokens?: string[]) => {
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_STAKING_TESTNET}::${STAKE}`,
        typeArguments: [],
        functionArguments: [tokens],
      },
    });
    console.log(res);
    if (res.hash) {
      const result = await APTOS.waitForTransaction({
        transactionHash: res.hash,
      });
      dispatch(updateRefresh(true));
      return result;
    }
  };

  return stake;
};

export default useStaking;
