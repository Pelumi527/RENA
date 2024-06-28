import { useDispatch } from "react-redux";
import { APTOS, COLLECTION_ADDRESS } from "../util/module-endpoints";
import {
  updateRenegadesData,
  updateRenegadesRankData,
} from "../state/renegades";
import { useQuery } from "react-query";

export const useTokenList = () => {
  const dispatch = useDispatch();

  const updateTokenList = async (accountAddress: string) => {
    const res = await APTOS.getAccountOwnedTokensFromCollectionAddress({
      accountAddress: accountAddress,
      collectionAddress: COLLECTION_ADDRESS,
    });
    console.log("token list => ", res);
    if (res.length < 1) {
      console.log("empty", res.length);
      dispatch(updateRenegadesData([]));
      dispatch(updateRenegadesRankData([]));
    } else {
      dispatch(
        updateRenegadesData(res.map((data: any) => data.current_token_data))
      );
    }
  };

  return updateTokenList;
};
export const useUserRenegadesData = ({
  accountAddress,
}: {
  accountAddress?: string;
}) => {
  const getUserTokenOwned = async () => {
    if (!accountAddress) {
      return;
    }
    return await APTOS.getAccountOwnedTokensFromCollectionAddress({
      accountAddress,
      collectionAddress: COLLECTION_ADDRESS,
    });
  };
  return useQuery({
    queryKey: ["getUserTokenOwned", accountAddress],
    queryFn: () => getUserTokenOwned(),
  });
};
