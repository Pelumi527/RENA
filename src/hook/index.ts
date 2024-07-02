import {
  APTOS,
  COLLECTION_ADDRESS_MAINNET,
  RENA_STAKING_MAINNET,
  RENA_STAKING_TESTNET,
} from "../util/module-endpoints";
import { getRaritiesForRenegadeItem } from "../util/renegadeUtils";
import { calculateRankings } from "../util/renegadeUtils";
import { renegadesJsonData } from "../pages/renegades";
import { useQuery } from "react-query";

export const useRenegadeRankData = ({
  accountAddress,
}: {
  accountAddress?: string;
}) => {
  const getRankRenegadesData = async () => {
    if (!accountAddress) {
      return [];
    }
    const res = await APTOS.getAccountOwnedTokensFromCollectionAddress({
      accountAddress: accountAddress,
      collectionAddress: COLLECTION_ADDRESS_MAINNET,
    });
    const renegadesData = res.map((data: any) => data.current_token_data);
    const itemsWithCalculatedRarities = renegadesJsonData.map(
      (renegade: any) => {
        const rarities = getRaritiesForRenegadeItem(
          renegadesJsonData,
          renegade.name
        );
        return {
          ...renegade,
          overallRarity: rarities.overallRarity,
        };
      }
    );
    const rankedItems = calculateRankings(itemsWithCalculatedRarities);
    const rankedRenegades = calculateRankings(rankedItems);
    const updatedRenegadesData = renegadesData
      .map((renegade) => {
        const foundRankedItem = rankedRenegades.find(
          (rankedItem) =>
            rankedItem?.name?.trim() === renegade?.token_name?.trim()
        );
        if (foundRankedItem) {
          return { ...renegade, rank: foundRankedItem.rank };
        }
        return renegade;
      })
      .sort((a, b) => (a.rank || 0) - (b.rank || 0));
    return updatedRenegadesData;
  };

  return useQuery({
    queryKey: ["getRankRenegadesData", accountAddress],
    queryFn: () => getRankRenegadesData(),
  });
};

export const useRenegadesRankStakedToken = ({
  accountAddress,
}: {
  accountAddress?: string;
}) => {
  const getStakedToken = async () => {
    try {
      const stakedToken = (await APTOS.view({
        payload: {
          function: `${RENA_STAKING_MAINNET}::staked_tokens`,
          typeArguments: [],
          functionArguments: [accountAddress],
        },
      })) as any;
      const renegadesData = await Promise.all(
        stakedToken[0].data.map(async (staked: any) => {
          return await APTOS.getDigitalAssetData({
            digitalAssetAddress: String(staked.key) ?? "",
          });
        })
      );
      console.log(renegadesData, "renegadesData22", stakedToken);
      const itemsWithCalculatedRarities = renegadesJsonData.map(
        (renegade: any) => {
          const rarities = getRaritiesForRenegadeItem(
            renegadesJsonData,
            renegade.name
          );
          return {
            ...renegade,
            overallRarity: rarities.overallRarity,
          };
        }
      );
      const rankedItems = calculateRankings(itemsWithCalculatedRarities);
      const rankedRenegades = calculateRankings(rankedItems);
      const updatedRenegadesData = renegadesData
        .map((renegade) => {
          const foundRankedItem = rankedRenegades.find(
            (rankedItem) =>
              rankedItem?.name?.trim() === renegade?.token_name?.trim()
          );
          if (foundRankedItem) {
            return { ...renegade, rank: foundRankedItem.rank };
          }
          return renegade;
        })
        .sort((a, b) => (a.rank || 0) - (b.rank || 0));
      return updatedRenegadesData;
    } catch (error) {
      console.log(error, "error");
      return [];
    }
  };
  return useQuery({
    queryKey: ["getStakedToken", accountAddress],
    queryFn: () => getStakedToken(),
  });
};

export const useUserRenaStakeTime = ({
  accountAddress,
  tokenAddress,
}: {
  accountAddress?: string;
  tokenAddress: string;
}) => {
  const getUserRENAStakeTime = async () => {
    if (!tokenAddress && !accountAddress) {
      return;
    }
    return (await APTOS.view({
      payload: {
        function: `${RENA_STAKING_MAINNET}::stake_time`,
        typeArguments: [],
        functionArguments: [accountAddress, tokenAddress],
      },
    })) as any;
  };
  return useQuery({
    queryKey: ["getUserRENAStakeTime", accountAddress, tokenAddress],
    queryFn: () => getUserRENAStakeTime(),
  });
};

export const useUserRenaStakePoint = ({
  accountAddress,
  tokenAddress,
}: {
  accountAddress?: string;
  tokenAddress: string;
}) => {
  const getUserRENAStakePoint = async () => {
    return (await APTOS.view({
      payload: {
        function: `${RENA_STAKING_MAINNET}::stake_points`,
        typeArguments: [],
        functionArguments: [accountAddress, tokenAddress],
      },
    })) as any;
  };
  return useQuery({
    queryKey: ["getUserRENAStakePoint", accountAddress, tokenAddress],
    queryFn: () => getUserRENAStakePoint(),
  });
};

export const useUserRenaTotalStakePoint = ({
  accountAddress,
  tokenAddress,
}: {
  accountAddress?: string;
  tokenAddress?: string[];
}) => {
  const getUserRENATotalStakePoint = async () => {
    const stakePointPerRene = (await APTOS.view({
      payload: {
        function: `${RENA_STAKING_MAINNET}::stake_points_vector`,
        typeArguments: [],
        functionArguments: [accountAddress, tokenAddress],
      },
    })) as [
      {
        data: [{ key: string; value: string }];
      }
    ];

    const totalStakePoint = stakePointPerRene[0].data.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.value),
      0
    );

    return totalStakePoint;
  };
  return useQuery({
    queryKey: ["getUserRENATotalStakePoint", accountAddress, tokenAddress],
    queryFn: () => getUserRENATotalStakePoint(),
  });
};
