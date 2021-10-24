import { useState, useEffect } from 'react'
import { usePoem } from '../../hooks/usePoem'
import toast, { Toaster } from 'react-hot-toast'
import Poems from '../poems'
import Search from './search'

type Props = {
  poemText: string
}

const UI = ({ poemText }: Props) => {
  const [type, setType] = useState('')
  const [keyword, setKeyword] = useState('')
  const poems = usePoem(type, keyword)

  const search = (type: string, keyword: string) => {
    setType(type)
    setKeyword(keyword)
  }

  const handleSearch = (type: string, keyword: string) => {
    search(type, keyword)
    toast(`「${keyword}」の検索結果です`, {
      icon: '📖'
    })
  }

  // idで指定されたポエムがあれば検索する
  useEffect(() => {
    if (poemText !== '') {
      search('text', poemText)
    }
  }, [poemText])

  return (
    <div className="flex-grow mx-4">
      <Toaster toastOptions={{ duration: 2500 }} />
      <Search onSearch={handleSearch} />
      <Poems items={poems} />
    </div>
  )
}

export default UI
