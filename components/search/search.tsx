import { useRef, useState } from 'react'
import { poemData } from '../../data/poem-data'
import Select from './select'

type SearchProps = {
  onSearch: (type: 'ownName' | 'clothesName', label: string) => void
}

const Search = (props: SearchProps) => {
  const idolSelect = useRef(null)
  const clothesSelect = useRef(null)

  // 選択要素に使用するアイドル名・衣装名
  const [idolNames] = useState(
    Array.from(new Set(poemData.map((e) => e.ownName)))
  )
  const [clothesNames] = useState(
    Array.from(new Set(poemData.map((e) => e.clothesName))).sort()
  )

  const handleChangeIdolName = (label: string) => {
    // 衣装名の選択をクリア
    if (clothesSelect.current.state.value) {
      clothesSelect.current.select.clearValue()
    }

    props.onSearch('ownName', label)
  }

  const handleChangeClothesName = (label: string) => {
    // アイドル名の選択をクリア
    if (idolSelect.current.state.value) {
      idolSelect.current.select.clearValue()
    }

    props.onSearch('clothesName', label)
  }

  return (
    <div className="px-4 py-8 text-center">
      <p className="text-2xl">
        <i className="ol-search-o mr-3" />
        SEARCH
      </p>
      <div className="flex flex-wrap justify-center mt-4">
        <Select
          placeholder="アイドル名から"
          options={idolNames}
          onChange={handleChangeIdolName}
          ref={idolSelect}
        />
        <Select
          placeholder="衣装名から"
          options={clothesNames}
          onChange={handleChangeClothesName}
          ref={clothesSelect}
        />
      </div>
    </div>
  )
}

export default Search
