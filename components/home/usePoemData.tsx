import { poemData } from '../../data/poem-data'
import { Poem } from '../../types/poem'

export const usePoemData = (
  type: 'ownName' | 'clothesName',
  keyword: string
): Poem[] => {
  return poemData.filter((e) => e[type] === keyword)
}
