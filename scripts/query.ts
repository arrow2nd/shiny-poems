import cloudinary from "cloudinary";

import { poemList } from "data/poem-list";

import { Poem } from "types/poem";

import { encodeForCloudinary, splitPoemText } from "./util";

export type Query = { [key: string]: string | string[] | undefined };

/**
 * IDからポエムの本文を取得
 * @param query クエリパラメータ
 * @returns ポエム本文
 */
export const getPoem = (query: Query): Poem | undefined => {
  const id = query.id || "";
  const idStr = Array.isArray(id) ? "" : id;
  if (!idStr) return undefined;

  return poemList.find((e) => e.id === idStr);
};

/**
 * OGP画像のURLを生成
 * @param query クエリパラメータ
 * @returns URL
 */
export const generateOgpImageUrl = (query: Query): string => {
  const defaultOgp = "https://shiny-poems.vercel.app/ogp-default.png";

  // idからポエムを取得
  const poem = getPoem(query);
  if (!poem) return defaultOgp;

  const poemText = splitPoemText(poem.text).join("\n");

  const ogpImgUrl = cloudinary.v2.url("shiny-poems/ogp-base.png", {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ["$poem", `!${encodeForCloudinary(poemText)}!`],
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
