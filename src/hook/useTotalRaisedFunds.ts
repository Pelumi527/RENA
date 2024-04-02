import { useDispatch } from "react-redux";
import {
    APTOS,
    RENA_PRESALE_TESTNET,
      TOTAL_RAISED_FUNDS
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useTotalRaisedFunds = () => {
    const dispatch = useDispatch();
  
    const viewTotalRaisedFunds = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TOTAL_RAISED_FUNDS}`
      };
      let res = await APTOS.view({payload});
        console.log('total raised funds: ', res);
        dispatch((res[0] as any));
    };
    return viewTotalRaisedFunds;
  };
  export default useTotalRaisedFunds;