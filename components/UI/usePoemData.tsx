import { poemData } from '../../data/poem-data'
import { Poem } from '../../types/poem'

export const usePoemData = (
  type: 'ownName' | 'clothsName',
  keyword: string
): Poem[] => {
  console.log(`[ usePoemData ] ${type} / ${keyword}`)

  const results = poemData.filter((e) => e[type] === keyword)
  return results
}
