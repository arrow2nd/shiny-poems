import { useEffect, useState } from 'react'

import Poems from 'components/poems'

import { usePoem } from 'hooks/usePoem'

import Line from './line'
import Search from './search'

type Props = {
  poemText: string
}

const UI = ({ poemText }: Props) => {
  const [type, setType] = useState('')
  const [keyword, setKeyword] = useState('')
  const poems = usePoem(type, keyword)

  const setSearchKeyword = (type: string, keyword: string) => {
    setType(type)
    setKeyword(keyword)
  }

  const handleSearch = (type: string, keyword: string) => {
    // 40文字以上なら切り取る
    if (keyword.length >= 40) {
      keyword = keyword.slice(0, 40)
    }

    // 検索キーワードをセット
    setSearchKeyword(type, keyword)
  }

  // idで指定されたポエムがあれば検索する
  useEffect(() => {
    if (poemText !== '') {
      setSearchKeyword('text', poemText)
    }
  }, [poemText])

  return (
    <div className="flex-grow mx-12">
      <Search onSearch={handleSearch} />
      <Line />
      <Poems items={poems} />
    </div>
  )
}

export default UI
