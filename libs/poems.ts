import { poemList } from "data/poem-list";

import { Poem } from "types/poem";

export type SearchParams = {
  type: keyof Poem;
  query: string;
};

/**
 * ポエムを検索
 * @param 検索条件
 * @returns ポエム
 */
export function searchPoems({ type, query }: SearchParams): Poem[] {
  // 検索条件なし
  if (type === "text" && query === "") {
    return [];
  }

  // キーワードに一致するものを探す
  const results = poemList.filter((e: Poem) => e[type].includes(query));

  // アイドル名での検索なら衣装名昇順でソート
  if (type === "idolName") {
    results.sort((a, b) => (a.clothesName > b.clothesName ? 1 : -1));
  }

  console.log(type, query, results);

  return results;
}
