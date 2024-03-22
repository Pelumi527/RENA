import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { APTOS, LIQUID_COIN_OBJECT_TESTNET, LIQUIFY, RENA_COIN_TYPE_TESTNET, RENA_MODULE_TESTNET } from "../util/module-endpoints";

const useLiquify = () => {
  const { signAndSubmitTransaction } = useWallet();

  const liquify = async (accountAddress: string, tokens?: string[]) => {
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_MODULE_TESTNET}::${LIQUIFY}`,
        typeArguments: [RENA_COIN_TYPE_TESTNET],
        functionArguments: [LIQUID_COIN_OBJECT_TESTNET, tokens],
      },
    });
    console.log(res);
    if (res.hash) {
      const result = await APTOS.waitForTransaction({
        transactionHash: res.hash,
      });
      return result;
    }
  };

  return liquify;
};

export default useLiquify;
