import { useRef, useState } from 'react'
import { poemData } from '../../data/poem-data'
import Input from './input'
import Select from './select'

type Props = {
  onSearch: (type: string, label: string) => void
}

const Search = (props: Props) => {
  // 選択要素に使用するアイドル名
  const [idolNames] = useState(
    Array.from(new Set(poemData.map((e) => e.idolName)))
  )

  // 選択要素に使用する衣装名
  const [clothesTitles] = useState(
    Array.from(new Set(poemData.map((e) => e.clothesTitle))).sort()
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

    if (keyword) {
      clearIdolSelect()
      clearClothesSelect()
      props.onSearch('text', keyword)
    }
  }

  const handleChangeIdolName = (label: string) => {
    clearKeywordInput()
    clearClothesSelect()
    props.onSearch('idolName', label)
  }

  const handleChangeclothesTitle = (label: string) => {
    clearKeywordInput()
    clearIdolSelect()
    props.onSearch('clothesTitle', label)
  }

  return (
    <div className="px-4 py-8 text-center">
      <p className="text-2xl">
        <i className="ol-search-o mr-3" />
        SEARCH
      </p>
      <div className="flex flex-col items-center mt-4">
        <Input
          placeholder="キーワードから"
          onSubmit={handleSubmit}
          ref={keywordInput}
        />
        <div className="flex flex-wrap justify-center">
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
    </div>
  )
}

export default Search
