import { cache } from "react";

import { poems } from "data/poems";

import { Poem } from "types/poem";

/**
 * クエリパラメータから取得した生のポエムID
 */
type RawPoemId = string | string[] | undefined;

/**
 * IDからポエムの本文を取得
 * @param id ポエムID
 * @returns ポエム本文
 */
export const getPoem = cache((id: RawPoemId): Poem | undefined => {
  const idStr = Array.isArray(id) ? "" : id;
  return idStr ? poems.find((e) => e.id === idStr) : undefined;
});
