import { useState } from 'react'
import { Poem } from '../../types/poem'

import Poems from '../poems/poems'
import Search from '../search/search'
import { usePoemData } from './usePoemData'

const UI = () => {
  const [results, setResults] = useState([] as Poem[])

  const handleChangeSelect = (
    type: 'ownName' | 'clothsName',
    label: string
  ) => {
    console.log(`[ search ] ${type} / ${label}`)
    setResults(usePoemData(type, label))
  }

  return (
    <>
      <Search onSearch={handleChangeSelect} />
      <Poems items={results} />
    </>
  )
}

export default UI
