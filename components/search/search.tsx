import { useRef, useState } from 'react'
import { poemData } from '../../data/poem-data'
import Select from './select'

type Props = {
  onSearch: (type: 'idolName' | 'clothesTitle', label: string) => void
}

const Search = (props: Props) => {
  const idolSelect = useRef(null)
  const clothesSelect = useRef(null)

  // 選択要素に使用するアイドル名・衣装名
  const [idolNames] = useState(
    Array.from(new Set(poemData.map((e) => e.idolName)))
  )
  const [clothesTitles] = useState(
    Array.from(new Set(poemData.map((e) => e.clothesTitle))).sort()
  )

  const handleChangeIdolName = (label: string) => {
    // 衣装名の選択をクリア
    if (clothesSelect.current.state.value) {
      clothesSelect.current.select.clearValue()
    }

    props.onSearch('idolName', label)
  }

  const handleChangeclothesTitle = (label: string) => {
    // アイドル名の選択をクリア
    if (idolSelect.current.state.value) {
      idolSelect.current.select.clearValue()
    }

    props.onSearch('clothesTitle', label)
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
          options={clothesTitles}
          onChange={handleChangeclothesTitle}
          ref={clothesSelect}
        />
      </div>
    </div>
  )
}

export default Search
