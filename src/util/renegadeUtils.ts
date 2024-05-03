export const levelClass = (rank: number) => {
  if (rank >= 1 && rank <= 50) {
    return ["text-[#B83032]", "Legendary"];
  } else if (rank >= 51 && rank <= 300) {
    return ["text-[#FFC539]", "Epic"];
  } else if (rank >= 301 && rank <= 1050) {
    return ["text-[#6F42C1]", "Rare"];
  } else if (rank >= 1051 && rank <= 2050) {
    return ["text-[#218380]", "Uncommon"];
  } else if (rank >= 2051 && rank <= 5000) {
    return ["text-[#CCCCCC]", "Common"];
  } else {
    return "text-gray-500";
  }
};
export interface Trait {
  trait_type: string;
  value: string;
}

export interface RenegadeItem {
  name: string;
  description: string;
  attributes: Trait[];
}

export interface RenegadeItemWithRarity extends RenegadeItem {
  overallRarity: number;
  rank: number;
}

export function calculateRankings(
  renegadesWithRarity: RenegadeItemWithRarity[],
): RenegadeItemWithRarity[] {
  return renegadesWithRarity
    .sort((a, b) => b.overallRarity - a.overallRarity)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

export const getRankForRenegadeItem = (
  itemName: string,
  renegadesWithRarity: RenegadeItemWithRarity[],
): number => {
  const rankedRenegades = calculateRankings(renegadesWithRarity);
  const item = rankedRenegades.find(
    (renegade) => renegade?.name?.trim() === itemName?.trim(),
  );
  if (!item) {
    throw new Error("Item not found");
  }
  return item.rank;
};

export function calculateTraitRarityScore(
  renegades: RenegadeItem[],
  traitValue: string,
  traitType: string,
): number {
  const totalOccurrences = renegades.reduce((acc, renegade) => {
    const trait = renegade.attributes.find(
      (t) => t.trait_type === traitType && t.value === traitValue,
    );
    return trait ? acc + 1 : acc;
  }, 0);
  if (totalOccurrences === 0) return 0;
  return totalOccurrences;
}

export function getRaritiesForRenegadeItem(
  renegades: RenegadeItem[],
  itemName: string,
): { overallRarity: number; traitRarities: Record<string, any> } {
  const item = renegades.find(
    (renegade) => renegade.name.trim() === itemName.trim(),
  );
  if (!item) {
    throw new Error("Item not found");
  }
  let overallRarity = 0;
  const traitRarities: Record<string, any> = {};

  const mostCommonTraitCounts: Record<string, number> = {
    BODY: 2156,
    EXPRESSION: 845,
    HAIR: 203,
    OUTFIT: 172,
    BACKGROUND: 657,
  };

  item.attributes.forEach((trait) => {
    const totalOccurrences = calculateTraitRarityScore(
      renegades,
      trait.value,
      trait.trait_type,
    );
    const collectionSize = 5000;
    const traitRarityPercentage = (totalOccurrences / collectionSize) * 100;
    const mostCommonCount = mostCommonTraitCounts[trait.trait_type] || 1;
    const rarityScore = 1 / (totalOccurrences / mostCommonCount);
    traitRarities[trait.trait_type] = [traitRarityPercentage, trait.value];
    overallRarity += rarityScore;
  });

  return { overallRarity, traitRarities };
}
