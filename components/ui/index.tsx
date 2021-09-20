import { useState, useEffect } from 'react'
import { usePoem } from '../../hooks/usePoem'
import Poems from '../poems'
import Search from './search'

type Props = {
  poemText: string
}

const UI = ({ poemText }: Props) => {
  const [type, setType] = useState('')
  const [keyword, setKeyword] = useState('')
  const poems = usePoem(type, keyword)

  const handleSearch = (type: string, keyword: string) => {
    setType(type)
    setKeyword(keyword)
  }

  // idで指定されたポエムがあれば検索する
  useEffect(() => {
    if (poemText !== '') {
      handleSearch('text', poemText)
    }
  }, [poemText])

  return (
    <div className="flex-grow mx-4">
      <Search onSearch={handleSearch} />
      <Poems items={poems} />
    </div>
  )
}

export default UI
