import { useDispatch } from "react-redux";
import {
    APTOS,
    END_TIME,
    RENA_PRESALE_TESTNET
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useEndTime = () => {
    const dispatch = useDispatch();
  
    const viewEndTime = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${END_TIME}`
      };
      let res = await APTOS.view({payload});
        console.log('end time: ', res);
        dispatch((res[0] as any));
    };

    return viewEndTime;
  };
  export default useEndTime;