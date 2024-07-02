import { useDispatch } from "react-redux";
import {
  APTOS,
  ONE_RENEGADES,
  RENA_COIN_TYPE_MAINNET,
  RENA_COIN_TYPE_TESTNET,
} from "../util/module-endpoints";
import { updateRenaBalance } from "../state/renegades";
import { InputViewFunctionData } from "@aptos-labs/ts-sdk";

const useTokenBalance = () => {
  const dispatch = useDispatch();

  const updateTokenBalance = async (accountAddress: string) => {
    const payload: InputViewFunctionData = {
      function: "0x1::coin::balance",
      typeArguments: [RENA_COIN_TYPE_MAINNET],
      functionArguments: [accountAddress],
    };
    const res = await APTOS.view({
      payload,
    });
    console.log(res);
    dispatch(updateRenaBalance(parseInt(res[0] as any) / ONE_RENEGADES));
  };
  return updateTokenBalance;
};
export default useTokenBalance;
