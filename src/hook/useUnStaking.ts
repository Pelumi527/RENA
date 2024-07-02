import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  APTOS,
  RENA_STAKING_MAINNET,
  RENA_STAKING_TESTNET,
  STAKE,
  UNSTAKE,
} from "../util/module-endpoints";
import { updateRefresh } from "../state/global";
import { useDispatch } from "react-redux";

const useUnStaking = () => {
  const { signAndSubmitTransaction } = useWallet();
  const dispatch = useDispatch();
  const Unstake = async (accountAddress: string, tokens?: string[]) => {
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_STAKING_MAINNET}::${UNSTAKE}`,
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

  return Unstake;
};

export default useUnStaking;
