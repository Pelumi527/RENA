import {
    APTOS,
    CONTRIBUTED_AMOUNT,
    RENA_PRESALE_TESTNET,
      TREASURY_ADDRESS
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useTokenBalance = () => {
  
    const updateTokenBalance = async (accountAddress: string) => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${CONTRIBUTED_AMOUNT}`,
        functionArguments: [accountAddress]
      };
      let res = await APTOS.view({payload});
          console.log(res);
    };
    return updateTokenBalance;
  };
  export default useTokenBalance;