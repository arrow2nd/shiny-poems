/**
 * ポエムを文の区切りで分割
 * @param text 文字列
 * @returns 文字列配列
 */
export const splitPoemText = (text: string) => {
  // 最初の文末で2つに分割
  const splited = text
    .match(/(.+?(?:[。！？]|[!?]\s)+)(.+)/)
    ?.map((e) => e.trim());

  // 分割できなければそのまま返す
  return splited ? [splited[1], splited[2]] : [text];
};

/**
 * Cloudinary用に文字列をエンコード
 * @param text 文字列
 * @returns エンコードされた文字列
 */
export const encodeForCloudinary = (text: string) => {
  return encodeURIComponent(
    text.replace(/\,/g, "%2C").replace(/\//g, "%2F").replace(/!/g, "%21")
  );
};
