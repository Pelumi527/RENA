import { useDispatch } from "react-redux";
import {
    APTOS,
    CONTRIBUTED_AMOUNT,
    RENA_PRESALE_TESTNET
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useContributedAmount = () => {
    const dispatch = useDispatch();
  
    const viewContributedAmount = async (accountAddress: string) => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${CONTRIBUTED_AMOUNT}`,
        functionArguments: [accountAddress]
      };
      let res = await APTOS.view({payload});
          console.log('contributed amount: ', res);
          dispatch((res[0] as any));
    };
    return viewContributedAmount;
  };
  export default useContributedAmount;