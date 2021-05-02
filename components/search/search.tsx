import { useRef, useState } from 'react'
import { poemData } from '../../data/poem-data'
import Select from './select'

type SearchProps = {
  onSearch: (type: 'ownName' | 'clothsName', label: string) => void
}

const Search = (props: SearchProps) => {
  const [idolNames] = useState(
    Array.from(new Set(poemData.map((e) => e.ownName)))
  )
  const [clothsNames] = useState(
    Array.from(new Set(poemData.map((e) => e.clothsName))).sort()
  )

  const idolSelect = useRef(null)
  const clothsSelect = useRef(null)

  const handleChangeIdolName = (label: string) => {
    if (clothsSelect.current.state.value) {
      clothsSelect.current.select.clearValue()
    }
    props.onSearch('ownName', label)
  }

  const handleChangeClothsName = (label: string) => {
    if (idolSelect.current.state.value) {
      idolSelect.current.select.clearValue()
    }
    props.onSearch('clothsName', label)
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
          options={clothsNames}
          onChange={handleChangeClothsName}
          ref={clothsSelect}
        />
      </div>
    </div>
  )
}

export default Search
