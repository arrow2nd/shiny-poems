import fs from 'fs'
import { fetchIdolData } from './util'
import { idolList, seriesList } from './data'
import { Poem } from '../types/poem'

// どのゲームに登場した衣装ポエムなのか判別できそうにないので
// 暫定的にポエムが1文字以上40文字未満のものを取得
const query = `
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?name ?owns ?clothesName ?clothesDesc
WHERE {
  ?d rdf:type imas:Idol;
     imas:Brand ?brand;
     rdfs:label ?name;
     schema:owns ?owns.
  filter(contains(?brand, 'ShinyColors')).
  ?owns schema:name ?clothesName;
        schema:description ?clothesDesc.
  filter(strlen(?clothesDesc) > 0 && strlen(?clothesDesc) < 40).
}
order by ?name
`

async function main() {
  const data = await fetchIdolData(query)

  const poem: Poem[] = data.map((e): Poem => {
    const id: string = e.owns.value.match(
      /https:\/\/sparql\.crssnky\.xyz\/imasrdf\/RDFs\/detail\/(.*)/
    )[1]

    const clothesName: string = e.clothesName.value
    let clothesTitle: string = e.clothesName.value

    // シリーズかチェック
    seriesList.forEach((v) => {
      if (v.regex.test(clothesName)) {
        clothesTitle = v.name
        return
      }
    })

    return {
      id,
      idolName: e.name.value,
      clothesTitle,
      clothesName,
      text: e.clothesDesc.value
    }
  })

  const sortedPoemData = poem.sort(
    (a, b) => idolList.indexOf(a.idolName) - idolList.indexOf(b.idolName)
  )

  // 保存
  const exp = `import { Poem } from '../types/poem'\n\nexport const poemList: Poem[] = ${JSON.stringify(
    sortedPoemData,
    null,
    '  '
  )}`

  fs.writeFileSync('./data/poem-list.ts', exp)

  console.log('[ success! ]')
}

main()
