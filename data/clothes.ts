import { poems } from "./poems";

export const clothes = [...new Set(poems.map((e) => e.clothesTitle))].sort();
