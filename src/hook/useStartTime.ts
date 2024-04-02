import { useDispatch } from "react-redux";
import {
    APTOS,
    RENA_PRESALE_TESTNET,
      START_TIME
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useStartTime = () => {
    const dispatch = useDispatch();
  
    const viewStartTime = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${START_TIME}`
      };
      let res = await APTOS.view({payload});
        console.log('start time: ', res);
        dispatch((res[0] as any));
    };
    return viewStartTime;
  };
  export default useStartTime;