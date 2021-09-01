import { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { poemList } from '../../data/poem-list'
import Input from './input'
import Select from './select'

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
    if (idolSelect.current.state.value) {
      idolSelect.current.select.clearValue()
    }
  }

  // 衣装名の選択をクリア
  const clearClothesSelect = () => {
    if (clothesSelect.current.state.value) {
      clothesSelect.current.select.clearValue()
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
      <div className="flex flex-row items-center justify-center text-center mb-4 text-natural-black">
        <BiSearch className="mr-2 text-3xl" />
        <span className="text-2xl tracking-wider">SEARCH</span>
      </div>
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
