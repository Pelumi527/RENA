export const levelClass = (rank: number) => {
    if (rank >= 1 && rank <= 50) {
        return "text-[#B83032]";
    } else if (rank >= 51 && rank <= 300) {
        return "text-[#FFC539]";
    } else if (rank >= 301 && rank <= 1050) {
        return "text-[#6F42C1]";
    } else if (rank >= 1051 && rank <= 2050) {
        return "text-[#218380]";
    } else if (rank >= 2051 && rank <= 5000) {
        return "text-[#CCCCCC]";
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

export function calculateRankings(renegadesWithRarity: RenegadeItemWithRarity[]): RenegadeItemWithRarity[] {
    return renegadesWithRarity.sort((a, b) => b.overallRarity - a.overallRarity)
        .map((item, index) => ({ ...item, rank: index + 1 }));
}

export const getRankForRenegadeItem = (itemName: string, renegadesWithRarity: RenegadeItemWithRarity[]): number => {
    const rankedRenegades = calculateRankings(renegadesWithRarity);
    const item = rankedRenegades.find(renegade => renegade?.name?.trim() === itemName?.trim());
    if (!item) {
        throw new Error('Item not found');
    }
    return item.rank;
};

export function calculateTraitRarityScore(renegades: RenegadeItem[], traitValue: string, traitType: string): number {
    const totalOccurrences = renegades.reduce((acc, renegade) => {
        const trait = renegade.attributes.find(t => t.trait_type === traitType && t.value === traitValue);
        return trait ? acc + 1 : acc;
    }, 0);

    const totalItems = renegades.length;
    if (totalOccurrences === 0) return 0;
    return totalItems / totalOccurrences;
}

export function getRaritiesForRenegadeItem(renegades: RenegadeItem[], itemName: string): { overallRarity: number; traitRarities: Record<string, any> } {
    const item = renegades.find((renegade) => renegade.name.trim() === itemName.trim());
    if (!item) {
        throw new Error('Item not found');
    }
    let overallRarity = 0;
    const traitRarities: Record<string, any> = {};

    item.attributes.forEach((trait) => {
        const rarityScore = calculateTraitRarityScore(renegades, trait.value, trait.trait_type);
        traitRarities[trait.trait_type] = [rarityScore, trait.value];
        overallRarity += rarityScore;
    });

    return { overallRarity, traitRarities };
}