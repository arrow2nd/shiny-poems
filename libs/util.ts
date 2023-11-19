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
