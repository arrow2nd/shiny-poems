import { Poem } from "types/poem";
import { Query } from "types/query";
import { poems } from "./poem-data";

export type State = {
  poems: Poem[];
};

/**
 * ポエムを検索
 * @param query 検索条件
 * @returns 検索結果
 */
export async function searchPoems(query: Query): Promise<Poem[]> {
  const { type, q } = query;

  // 検索条件なし
  if (!query && !q) {
    return [];
  }

  // キーワードに一致するものを探す
  const results = poems.filter((e: Poem) => {
    if (!q) {
      return false;
    }

    switch (type) {
      case "poem":
        return e["text"].includes(q);
      case "idol":
        return e["idolName"].includes(q);
      case "clothe":
        return e["clothesTitle"].includes(q);
      default:
        return false;
    }
  });

  // アイドル名での検索なら衣装名昇順でソート
  if (type === "idol") {
    results.sort((a, b) => a.clothesName.localeCompare(b.clothesName));
  }

  return results;
}
