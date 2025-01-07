const defaultSuccessChances: Record<
  string,
  Record<string, Record<string, number>>
> = {
  beach: {
    training: {
      any: 60,
      greenleaf: 65,
      "leaf-bare": 55,
      "leaf-fall": 60,
      newleaf: 60,
    },
    hunting: {
      any: 50,
      greenleaf: 50,
      "leaf-bare": 40,
      "leaf-fall": 50,
      newleaf: 50,
    },
    border: {
      any: 40,
      greenleaf: 50,
      "leaf-bare": 40,
      "leaf-fall": 40,
      newleaf: 40,
    },
    herb_gathering: {
      any: 50,
      greenleaf: 60,
      "leaf-bare": 40,
      "leaf-fall": 50,
      newleaf: 50,
    },
  },
  desert: {
    training: {
      any: 60,
      greenleaf: 40,
      "leaf-bare": 70,
      "leaf-fall": 60,
      newleaf: 60,
    },
    hunting: {
      any: 50,
      greenleaf: 30,
      "leaf-bare": 65,
      "leaf-fall": 50,
      newleaf: 50,
    },
    border: {
      any: 40,
      greenleaf: 20,
      "leaf-bare": 60,
      "leaf-fall": 40,
      newleaf: 40,
    },
    herb_gathering: {
      any: 40,
      greenleaf: 30,
      "leaf-bare": 50,
      "leaf-fall": 40,
      newleaf: 40,
    },
  },
  forest: {
    training: {
      any: 60,
      greenleaf: 70,
      "leaf-bare": 50,
      "leaf-fall": 60,
      newleaf: 60,
    },
    hunting: {
      any: 50,
      greenleaf: 60,
      "leaf-bare": 35,
      "leaf-fall": 50,
      newleaf: 50,
    },
    border: {
      any: 40,
      greenleaf: 50,
      "leaf-bare": 30,
      "leaf-fall": 40,
      newleaf: 40,
    },
    herb_gathering: {
      any: 50,
      greenleaf: 60,
      "leaf-bare": 40,
      "leaf-fall": 50,
      newleaf: 50,
    },
  },
  mountainous: {
    training: {
      any: 60,
      greenleaf: 70,
      "leaf-bare": 40,
      "leaf-fall": 60,
      newleaf: 60,
    },
    hunting: {
      any: 50,
      greenleaf: 65,
      "leaf-bare": 35,
      "leaf-fall": 50,
      newleaf: 50,
    },
    border: {
      any: 40,
      greenleaf: 60,
      "leaf-bare": 20,
      "leaf-fall": 40,
      newleaf: 40,
    },
    herb_gathering: {
      any: 60,
      greenleaf: 70,
      "leaf-bare": 40,
      "leaf-fall": 60,
      newleaf: 60,
    },
  },
  plains: {
    training: {
      any: 60,
      greenleaf: 70,
      "leaf-bare": 50,
      "leaf-fall": 60,
      newleaf: 60,
    },
    hunting: {
      any: 50,
      greenleaf: 60,
      "leaf-bare": 35,
      "leaf-fall": 50,
      newleaf: 50,
    },
    border: {
      any: 40,
      greenleaf: 50,
      "leaf-bare": 30,
      "leaf-fall": 40,
      newleaf: 40,
    },
    herb_gathering: {
      any: 50,
      greenleaf: 60,
      "leaf-bare": 40,
      "leaf-fall": 50,
      newleaf: 50,
    },
  },
  wetlands: {
    training: {
      any: 60,
      greenleaf: 65,
      "leaf-bare": 55,
      "leaf-fall": 60,
      newleaf: 60,
    },
    hunting: {
      any: 50,
      greenleaf: 50,
      "leaf-bare": 40,
      "leaf-fall": 50,
      newleaf: 50,
    },
    border: {
      any: 40,
      greenleaf: 50,
      "leaf-bare": 40,
      "leaf-fall": 40,
      newleaf: 40,
    },
    herb_gathering: {
      any: 60,
      greenleaf: 70,
      "leaf-bare": 50,
      "leaf-fall": 60,
      newleaf: 60,
    },
  },
};

const genSuccessChance: Record<string, number> = {
  border: 40,
  hunting: 50,
  herb_gathering: 50,
  training: 60,
};

function getDefaultSuccessChance(
  biome: string[],
  patrolType: string,
  season: string[],
) {
  if (biome.length !== 1 || season.length !== 1) {
    return genSuccessChance[patrolType];
  }
  if (biome[0] === "any") {
    return genSuccessChance[patrolType];
  }
  const chance = defaultSuccessChances[biome[0]][patrolType][season[0]];
  if (chance === undefined) {
    return genSuccessChance[patrolType];
  }
  return chance;
}

function convertRarityToWeight(rarity: string) {
  var weight = 20;
  if (rarity === "prevalent") {
    return 40;
  } else if (rarity === "common") {
    return 30;
  } else if (rarity === "rare") {
    return 10;
  } else if (rarity === "very rare") {
    return 5;
  }
  return weight;
}

export { getDefaultSuccessChance, convertRarityToWeight };
