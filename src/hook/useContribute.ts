import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { APTOS, CONTRIBUTE, RENA_PRESALE_TESTNET } from "../util/module-endpoints";
import { useDispatch } from "react-redux";
import { updateLRDLoading, updateLastRenegadesData } from "../state/renegades";
import { Events } from "../api/events";
import { MoveUint64Type } from "@aptos-labs/ts-sdk";

const useContribute = () => {
  const { signAndSubmitTransaction } = useWallet();

  const contribute = async (accountAddress: string, aptAmount: any) => {
    console.log("input==============>", accountAddress, aptAmount)
    const res = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${RENA_PRESALE_TESTNET}::${CONTRIBUTE}`,
        typeArguments: [],
        functionArguments: [aptAmount * 1e8],
      },
    });
    // print tx hash
    console.log("res=============>", res);
  };

  return contribute;
};

export default useContribute;
