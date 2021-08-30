import { useEffect } from 'react'
import { useState } from 'react'
import { searchPoem } from '../../scripts/search-poem'
import { Poem } from '../../types/poem'
import Poems from '../poems'
import Search from './search'

type Props = {
  poemText: string
}

const UI = ({ poemText }: Props) => {
  const [searchResults, setSearchResults] = useState([] as Poem[])

  // 条件とキーワードから検索する
  const handleSearch = (type: string, keyword: string) => {
    const newSearchResults = searchPoem(type, keyword)
    setSearchResults(newSearchResults)
  }

  // idで指定されたポエムがあれば検索する
  useEffect(() => {
    if (poemText != '') {
      handleSearch('text', poemText)
    }
  }, [])

  return (
    <div className="flex-grow mx-4">
      <Search onSearch={handleSearch} />
      <Poems items={searchResults} />
    </div>
  )
}

export default UI
