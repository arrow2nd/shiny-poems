#!/usr/bin/env tsx
import { writeFileSync } from "fs";
import { join } from "path";
import { poems, updatedAtUTC } from "../data/poems";

const jsonData = {
  updatedAt: updatedAtUTC,
  poems: poems
};

const outputPath = join(process.cwd(), "data", "poems.json");

writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

console.log(`✅ Converted ${poems.length} poems to JSON format`);
console.log(`📁 Output: ${outputPath}`);