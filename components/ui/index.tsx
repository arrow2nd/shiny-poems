import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import Poems from 'components/poems'

import { usePoem } from 'hooks/usePoem'

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

    // トーストを表示
    toast.success(`「${keyword}」の検索結果です`, {
      style: {
        border: '1px solid #e5e7eb',
        padding: '12px'
      },
      iconTheme: {
        primary: '#78aeff',
        secondary: '#FFFAEE'
      },
      duration: 4000
    })
  }

  // idで指定されたポエムがあれば検索する
  useEffect(() => {
    if (poemText !== '') {
      setSearchKeyword('text', poemText)
    }
  }, [poemText])

  return (
    <div className="flex-grow mx-4">
      <Toaster />
      <Search onSearch={handleSearch} />
      <Poems items={poems} />
    </div>
  )
}

export default UI
