import { useDispatch } from "react-redux";
import {
    APTOS,
    REMAINING_TIME,
    RENA_PRESALE_TESTNET
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useRemainingTime = () => {
    const dispatch = useDispatch();
  
    const viewRemainingTime = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${REMAINING_TIME}`
      };
      let res = await APTOS.view({payload});
        console.log('remaining time: ', res);
        dispatch((res[0] as any));
    };
    return viewRemainingTime;
  };
  export default useRemainingTime;