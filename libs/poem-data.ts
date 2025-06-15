import { Poem } from "types/poem";
import poemsJson from "../data/poems.json";

export const poems: Poem[] = poemsJson.poems;
export const updatedAtUTC: string = poemsJson.updatedAt;