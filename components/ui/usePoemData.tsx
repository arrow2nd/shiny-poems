import { poemList } from '../../data/poem-list'
import { Poem } from '../../types/poem'

export const usePoemData = (type: string, keyword: string): Poem[] => {
  // キーワードに一致するものを探す
  const results = poemList.filter((e) => RegExp(keyword).test(e[type]))

  // アイドル名での検索なら衣装名昇順でソート
  if (type === 'idolName') {
    results.sort((a, b) => (a.clothesName > b.clothesName ? 1 : -1))
  }

  return results
}
