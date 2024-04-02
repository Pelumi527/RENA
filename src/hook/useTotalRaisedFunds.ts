import {
    APTOS,
    RENA_PRESALE_TESTNET,
      TOTAL_RAISED_FUNDS
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useTokenBalance = () => {
  
    const updateTokenBalance = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TOTAL_RAISED_FUNDS}`
      };
      let res = await APTOS.view({payload});
        console.log(res);
    };
    return updateTokenBalance;
  };
  export default useTokenBalance;