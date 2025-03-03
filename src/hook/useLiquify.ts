import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  APTOS,
  LIQUID_COIN_OBJECT_MAINNET,
  LIQUIFY_WITH_ADDRESS,
  RENA_MODULE_MAINNET,
} from "../util/module-endpoints";
import { updateRefresh } from "../state/global";
import { useDispatch } from "react-redux";

const useLiquify = () => {
  const { signAndSubmitTransaction } = useWallet();
  const dispatch = useDispatch();
  const liquify = async (accountAddress: string, tokens?: string[]) => {
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_MODULE_MAINNET}::${LIQUIFY_WITH_ADDRESS}`,
        typeArguments: [],
        functionArguments: [LIQUID_COIN_OBJECT_MAINNET, tokens],
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

  return liquify;
};

export default useLiquify;
