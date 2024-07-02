import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  APTOS,
  RENA_STAKING_MAINNET,
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
        function: `${RENA_STAKING_MAINNET}::${STAKE}`,
        typeArguments: [],
        functionArguments: [tokens],
      },
    });
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
