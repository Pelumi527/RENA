import { useDispatch } from "react-redux";
import {
    APTOS,
    RENA_PRESALE_TESTNET,
      TOTAL_CONTRIBUTORS
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useTotalContributors = () => {
    const dispatch = useDispatch();
  
    const viewTotalContributors = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${TOTAL_CONTRIBUTORS}`
      };
      let res = await APTOS.view({payload});
        console.log('total contributors number: ', res);
        dispatch((res[0] as any));
    };
    return viewTotalContributors;
  };
  export default useTotalContributors;