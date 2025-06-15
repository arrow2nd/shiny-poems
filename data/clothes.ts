import poemsData from "./poems.json";

export const clothes = [
  ...new Set(poemsData.poems.map((e) => e.clothesTitle))
].sort();

