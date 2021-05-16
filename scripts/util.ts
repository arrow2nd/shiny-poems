export const splitText = (text: string) => {
  const splited = text.match(/(.*?[。！])(.*)/)

  // 分割できなかったならそのまま返す
  if (!splited) {
    return [text]
  }

  return [splited[1], splited[2]]
}
