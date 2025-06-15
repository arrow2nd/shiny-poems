import { cache } from "react";
import poemsData from "data/poems.json";
import { Poem } from "types/poem";

/**
 * IDからポエムの本文を取得
 * @param id ポエムID
 * @returns ポエム
 */
export const getPoem = cache((poemId: string): Poem[] => {
  const matchedPoem = poemId
    ? poemsData.poems.find((e) => e.id === poemId)
    : undefined;
  return matchedPoem ? [matchedPoem] : [];
});

/**
 * ポエムを文の区切りで分割
 * @param text 文字列
 * @returns 文字列配列
 */
export const splitPoemText = (text: string) => {
  // 最初の文末で2つに分割
  const results = text
    .match(/(.+?(?:[。！？]|[!?]\s)+)(.+)/)
    ?.map((e) => e.trim());

  // 分割できなければそのまま返す
  return results ? [results[1], results[2]] : [text];
};
