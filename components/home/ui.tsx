import { useState } from 'react'
import { Poem } from '../../types/poem'

import Poems from '../poems/poems'
import Search from '../search/search'
import { usePoemData } from './usePoemData'

const UI = () => {
  const [searchResults, setSearchResults] = useState([] as Poem[])

  // 検索条件が変更された
  const handleChangeSelect = (
    type: 'ownName' | 'clothesName',
    label: string
  ) => {
    const newSearchResults = usePoemData(type, label)
    setSearchResults(newSearchResults)
  }

  return (
    <>
      <Search onSearch={handleChangeSelect} />
      <Poems items={searchResults} />
    </>
  )
}

export default UI
