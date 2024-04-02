import {
    APTOS,
    RENA_PRESALE_TESTNET,
      START_TIME
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useTokenBalance = () => {
  
    const updateTokenBalance = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${START_TIME}`
      };
      let res = await APTOS.view({payload});
        console.log(res);
    };
    return updateTokenBalance;
  };
  export default useTokenBalance;