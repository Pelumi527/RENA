import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  CONTRIBUTE,
  PUBLIC_PRESALE,
  RENA_PRESALE_MAINNET,
  WHITELISTED_PRESALE,
} from "../util/module-endpoints";

const useWhitelistContribute = () => {
  const { signAndSubmitTransaction } = useWallet();

  const contribute = async (accountAddress: string, aptAmount: number) => {
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_PRESALE_MAINNET}::${CONTRIBUTE}`,
        typeArguments: [WHITELISTED_PRESALE],
        functionArguments: [(aptAmount as any) * 1e8],
      },
    });
    // print tx hash
    console.log("res=============>", res);
  };

  return contribute;
};

export default useWhitelistContribute;
