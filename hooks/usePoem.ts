import { useEffect, useState } from "react";

import { poemList } from "data/poem-list";

import { Poem } from "types/poem";

/**
 * ポエムを検索
 * @param type 検索条件
 * @param keyword キーワード
 * @returns 該当するポエムデータの配列
 */
export const usePoem = (type: string, keyword: string): Poem[] => {
  const [poems, setPoems] = useState([] as Poem[]);

  useEffect(() => {
    // 検索条件が無い
    if (type === "" && keyword === "") {
      setPoems([]);
      return;
    }

    // キーワードに一致するものを探す
    const results = poemList.filter((e: Poem) => {
      const item: string = e[type];
      return item.includes(keyword);
    });

    // アイドル名での検索なら衣装名昇順でソート
    if (type === "idolName") {
      results.sort((a, b) => (a.clothesName > b.clothesName ? 1 : -1));
    }

    setPoems(results);
  }, [keyword, type]);

  return poems;
};
