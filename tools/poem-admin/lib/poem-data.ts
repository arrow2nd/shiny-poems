import fs from "fs/promises";
import path from "path";

export interface Poem {
  id: string;
  idolName: string;
  clothesTitle: string;
  clothesName: string;
  text: string;
}

export interface PoemData {
  updatedAt: string;
  poems: Poem[];
}

const DATA_PATH = path.join(process.cwd(), "../../data/poems.json");

export async function loadPoems(): Promise<PoemData> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load poems:", error);
    return { updatedAt: new Date().toISOString(), poems: [] };
  }
}

export async function savePoems(data: PoemData): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(DATA_PATH, json, "utf-8");
}

export function generatePoemId(idolName: string, clothesName: string): string {
  const cleanName = clothesName.replace(/[^a-zA-Z0-9]/g, "");
  const cleanIdol = idolName.replace(
    /[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g,
    ""
  );
  return `${cleanName}_${cleanIdol}`;
}

export function validatePoem(poem: Partial<Poem>): string[] {
  const errors: string[] = [];

  if (!poem.idolName?.trim()) {
    errors.push("アイドル名は必須です");
  }

  if (!poem.clothesTitle?.trim()) {
    errors.push("衣装タイトルは必須です");
  }

  if (!poem.clothesName?.trim()) {
    errors.push("衣装名は必須です");
  }

  if (!poem.text?.trim()) {
    errors.push("ポエムテキストは必須です");
  }

  if (poem.text && poem.text.length > 100) {
    errors.push("ポエムテキストは100文字以内で入力してください");
  }

  return errors;
}

