import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  CONTRIBUTE,
  PUBLIC_PRESALE,
  RENA_PRESALE_MAINNET,
} from "../util/module-endpoints";

const useContribute = () => {
  const { signAndSubmitTransaction } = useWallet();

  const contribute = async (accountAddress: string, aptAmount: number) => {
    console.log("input==============>", accountAddress, aptAmount);
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_PRESALE_MAINNET}::${CONTRIBUTE}`,
        typeArguments: [PUBLIC_PRESALE],
        functionArguments: [(aptAmount as any) * 1e8],
      },
    });
    // print tx hash
    console.log("res=============>", res);
  };

  return contribute;
};

export default useContribute;
