import { useRef, useState } from 'react'
import { clothsData } from '../../data/cloths'
import Select from './select'

const Search = () => {
  const [idolNames] = useState(
    Array.from(new Set(clothsData.map((e) => e.ownName)))
  )
  const [clothsNames] = useState(
    Array.from(new Set(clothsData.map((e) => e.clothsName))).sort()
  )

  // TODO: 鬼汚いのでなんとか纏める
  const idolRef = useRef(null)
  const clothsRef = useRef(null)

  const handleChangeIdolName = (index: number) => {
    if (clothsRef.current.state.value) {
      clothsRef.current.select.clearValue()
      return
    }

    console.log(`[ select ] ${idolNames[index]}`)
  }

  const handleChangeClothsName = (index: number) => {
    if (idolRef.current.state.value) {
      idolRef.current.select.clearValue()
      return
    }

    console.log(`[ select ] ${clothsNames[index]}`)
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
          ref={idolRef}
        />
        <Select
          placeholder="衣装名から"
          options={clothsNames}
          onChange={handleChangeClothsName}
          ref={clothsRef}
        />
      </div>
    </div>
  )
}

export default Search
