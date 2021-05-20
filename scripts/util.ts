/**
 * 文の区切りで分割
 *
 * @param text 文字列
 * @returns 文字列配列
 */
export const splitText = (text: string) => {
  const splited = text.match(/(.*?[。！？!?])(.*)/)

  // 分割できなかったならそのまま返す
  if (!splited) {
    return [text]
  }

  return [splited[1], splited[2]]
}

/**
 * 文字列をエンコード
 *
 * @param str 文字列
 * @returns エンコードされた文字列
 */
export const encode = (str: string) => {
  return encodeURIComponent(str.replace(/\,/g, '%2C').replace(/\//g, '%2F'))
}
