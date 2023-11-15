"use server";

import { poemList } from "data/poem-list";

import { Poem } from "types/poem";

type State = {
  poems: Poem[];
};

/**
 * ポエムを検索
 * @param type 検索タイプ
 * @param query クエリ
 * @returns ポエム
 */
export async function searchPoems(state: State, formData: FormData) {
  const type = formData.get("type");
  const query = formData.get("query");

  // 検索条件なし
  if (!type || !query || (type === "text" && query === "")) {
    return state;
  }

  if (!["idolName", "clothesTitle", "text"].includes(type.toString())) {
    return state;
  }

  // キーワードに一致するものを探す
  const poems = poemList.filter((e: Poem) =>
    e[type.toString()].includes(query)
  );

  // アイドル名での検索なら衣装名昇順でソート
  if (type === "idolName") {
    poems.sort((a, b) => (a.clothesName > b.clothesName ? 1 : -1));
  }

  console.log(type, query, poems);

  return { poems };
}
