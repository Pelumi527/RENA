import { useDispatch } from "react-redux";
import {
    APTOS,
    IS_COMPLETED,
    RENA_PRESALE_TESTNET
  } from "../util/module-endpoints";
  import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
  
  const useIsCompleted = () => {
    const dispatch = useDispatch();
  
    const viewIsCompleted = async () => {
      const payload: InputViewFunctionData = {
        function: `${RENA_PRESALE_TESTNET}::${IS_COMPLETED}`
      };
      let res = await APTOS.view({payload});
        console.log('is completed: ', res);
        dispatch((res[0] as any));
    };
    return viewIsCompleted;
  };
  export default useIsCompleted;