import { useState } from 'react'
import { searchPoem } from '../../scripts/search-poem'
import { Poem } from '../../types/poem'
import Poems from '../poems'
import Search from './search'

const UI = () => {
  const [searchResults, setSearchResults] = useState([] as Poem[])

  // 条件とキーワードから検索する
  const handleSearch = (type: string, keyword: string) => {
    const newSearchResults = searchPoem(type, keyword)
    setSearchResults(newSearchResults)
  }

  return (
    <div className="flex-grow mx-4">
      <Search onSearch={handleSearch} />
      <Poems items={searchResults} />
    </div>
  )
}

export default UI
