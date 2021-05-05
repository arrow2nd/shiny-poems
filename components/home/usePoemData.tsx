import { poemData } from '../../data/poem-data'
import { Poem } from '../../types/poem'

export const usePoemData = (
  type: 'idolName' | 'clothesTitle',
  keyword: string
): Poem[] => {
  return poemData.filter((e) => e[type] === keyword)
}
