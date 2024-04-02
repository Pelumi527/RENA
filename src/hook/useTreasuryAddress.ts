import { useDispatch } from "react-redux";
import {
  APTOS,
  RENA_PRESALE_TESTNET,
    TREASURY_ADDRESS
} from "../util/module-endpoints";
import { InputViewFunctionData } from "@aptos-labs/ts-sdk";

const useTreasuryAddress = () => {
  const dispatch = useDispatch();

  const viewTreasuryAddress = async () => {
    const payload: InputViewFunctionData = {
      function: `${RENA_PRESALE_TESTNET}::${TREASURY_ADDRESS}`
    };
    let res = await APTOS.view({payload});
        console.log('treasury address: ', res);
        dispatch((res[0] as any));
  };
  return viewTreasuryAddress;
};
export default useTreasuryAddress;