"use server";

import { poems } from "data/poems";
import { Poem } from "types/poem";

export type State = {
  poems: Poem[];
};

/**
 * ポエムを検索
 * @param state 現在の状態
 * @param formData フォームから送信されたデータ
 * @returns 検索結果
 */
export async function searchPoems(state: State, formData: FormData) {
  const query = formData.get("query")?.toString();
  const idol = formData.get("idol")?.toString();
  const clothe = formData.get("clothe")?.toString();

  // 検索条件なし
  if (!query && !idol && !clothe) {
    return state;
  }

  // キーワードに一致するものを探す
  const results = poems.filter((e: Poem) => {
    if (query) {
      return e["text"].includes(query);
    } else if (idol) {
      return e["idolName"].includes(idol);
    } else if (clothe) {
      return e["clothesTitle"].includes(clothe);
    }

    return false;
  });

  // アイドル名での検索なら衣装名昇順でソート
  if (idol) {
    results.sort((a, b) => (a.clothesName > b.clothesName ? 1 : -1));
  }

  return { poems: results };
}
