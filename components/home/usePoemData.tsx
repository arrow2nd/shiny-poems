import { poemData } from '../../data/poem-data'
import { Poem } from '../../types/poem'

export const usePoemData = (type: string, keyword: string): Poem[] => {
  const results = poemData.filter((e) => e[type] === keyword)

  // アイドル名での検索なら衣装名昇順でソート
  if (type === 'idolName') {
    results.sort((a, b) => (a.clothesName > b.clothesName ? 1 : -1))
  }

  return results
}
