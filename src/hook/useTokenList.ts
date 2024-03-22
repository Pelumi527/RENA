import { useDispatch } from "react-redux";
import { APTOS, COLLECTION_ADDRESS } from "../util/module-endpoints";
import { updateRenegadesData } from "../state/renegades";

const useTokenList = () => {
  const dispatch = useDispatch();

  const updateTokenList = async (accountAddress: string) => {
    const res = await APTOS.getAccountOwnedTokensFromCollectionAddress({
      accountAddress: accountAddress,
      collectionAddress: COLLECTION_ADDRESS,
    });
    console.log("token list => ", res)
    dispatch(
      updateRenegadesData(res.map((data: any) => data.current_token_data))
    );
  };

  return updateTokenList;
};

export default useTokenList;