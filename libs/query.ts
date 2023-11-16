import cloudinary from "cloudinary";
import { cache } from "react";

import { poemList } from "data/poem-list";

import { Poem } from "types/poem";

import { encodeForCloudinary, splitPoemText } from "./util";

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
  return idStr ? poemList.find((e) => e.id === idStr) : undefined;
});

export type SelectOptions = {
  idols: string[];
  clothes: string[];
};

/**
 * 選択のオプション
 */
export const selectOptions: SelectOptions = {
  idols: [...new Set(poemList.map((e) => e.idolName))],
  clothes: [...new Set(poemList.map((e) => e.clothesTitle))].sort()
};

/**
 * OGP画像のURLを生成
 * @param id ポエムID
 * @returns URL
 */
export const generateOgpImageUrl = (id: RawPoemId): string => {
  const defaultOgp = "https://shiny-poems.vercel.app/ogp-default.png";

  // idからポエムを取得
  const poem = getPoem(id);
  if (!poem) return defaultOgp;

  // OGP画像のURLを作成
  const text = splitPoemText(poem.text).join("\n");
  const ogpImgUrl = cloudinary.v2.url("shiny-poems/ogp-base.png", {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ["$poem", `!${encodeForCloudinary(text)}!`],
          ["$clothes", `!${encodeForCloudinary(poem.clothesName)}!`],
          ["$idol", `!${encodeForCloudinary(poem.idolName)}!`]
        ]
      },
      {
        transformation: ["poem-ogp"]
      }
    ]
  });

  return ogpImgUrl;
};
