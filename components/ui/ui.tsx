import { useState } from 'react'
import { Poem } from '../../types/poem'

import Poems from '../poems/poems'
import Search from './search'
import { usePoemData } from './usePoemData'

const UI = () => {
  const [searchResults, setSearchResults] = useState([] as Poem[])

  // 条件とキーワードから検索する
  const handleSearch = (type: string, keyword: string) => {
    const newSearchResults = usePoemData(type, keyword)
    setSearchResults(newSearchResults)
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      <Poems items={searchResults} />
    </>
  )
}

export default UI
