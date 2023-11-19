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

/**
 * ポエムを文の区切りで分割
 * @param text 文字列
 * @returns 文字列配列
 */
export const splitPoemText = (text: string) => {
  // 最初の文末で2つに分割
  const splitted = text
    .match(/(.+?(?:[。！？]|[!?]\s)+)(.+)/)
    ?.map((e) => e.trim());

  // 分割できなければそのまま返す
  return splitted ? [splitted[1], splitted[2]] : [text];
};
