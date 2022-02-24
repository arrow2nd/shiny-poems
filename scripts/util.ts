/**
 * ポエムを文の区切りで分割
 * @param text 文字列
 * @returns 文字列配列
 */
export const splitPoemText = (text: string) => {
  const splited = text.match(/(.*?[。！？!?])(.*)/)

  // 分割できなければそのまま返す
  return splited ? [splited[1], splited[2]] : [text]
}

/**
 * Cloudinary用に文字列をエンコード
 * @param str 文字列
 * @returns エンコードされた文字列
 */
export const encodeForCloudinary = (str: string) => {
  return encodeURIComponent(
    str.replace(/\,/g, '%2C').replace(/\//g, '%2F').replace(/!/g, '%21')
  )
}
