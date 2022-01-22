import { useRef, useState } from 'react'

import Input from 'components/ui/input'
import Select from 'components/ui/select'

import { poemList } from 'data/poem-list'

import Label from './label'

type Props = {
  onSearch: (type: string, label: string) => void
}

const Search = ({ onSearch }: Props) => {
  // 選択要素に使用するアイドル名
  const [idolNames] = useState(
    Array.from(new Set(poemList.map((e) => e.idolName)))
  )

  // 選択要素に使用する衣装名
  const [clothesTitles] = useState(
    Array.from(new Set(poemList.map((e) => e.clothesTitle))).sort()
  )

  const keywordInput = useRef(null)
  const idolSelect = useRef(null)
  const clothesSelect = useRef(null)

  // キーワード欄をクリア
  const clearKeywordInput = () => {
    if (keywordInput.current.value) {
      keywordInput.current.value = ''
    }
  }

  // アイドル名の選択をクリア
  const clearIdolSelect = () => {
    if (idolSelect.current.state.selectValue) {
      idolSelect.current.clearValue()
    }
  }

  // 衣装名の選択をクリア
  const clearClothesSelect = () => {
    if (clothesSelect.current.state.selectValue) {
      clothesSelect.current.clearValue()
    }
  }

  const handleSubmit = () => {
    const keyword = keywordInput.current.value
    if (!keyword) return

    clearIdolSelect()
    clearClothesSelect()

    onSearch('text', keyword)
  }

  const handleChangeIdolName = (label: string) => {
    clearKeywordInput()
    clearClothesSelect()

    onSearch('idolName', label)
  }

  const handleChangeclothesTitle = (label: string) => {
    clearKeywordInput()
    clearIdolSelect()

    onSearch('clothesTitle', label)
  }

  return (
    <div className="text-center px-4 mb-10 md:mb-14">
      <Label />
      <div className="flex flex-wrap justify-center">
        <Input
          placeholder="ポエムの一部から"
          onSubmit={handleSubmit}
          ref={keywordInput}
        />
        <Select
          placeholder="アイドル名から"
          options={idolNames}
          onChange={handleChangeIdolName}
          ref={idolSelect}
        />
        <Select
          placeholder="衣装名から"
          options={clothesTitles}
          onChange={handleChangeclothesTitle}
          ref={clothesSelect}
        />
      </div>
    </div>
  )
}

export default Search
