'use strict'
const fs = require('fs')
const axios = require('axios')

const idolList = [
  '櫻木真乃',
  '風野灯織',
  '八宮めぐる',
  '月岡恋鐘',
  '田中摩美々',
  '白瀬咲耶',
  '三峰結華',
  '幽谷霧子',
  '小宮果穂',
  '園田智代子',
  '西城樹里',
  '杜野凛世',
  '有栖川夏葉',
  '大崎甘奈',
  '大崎甜花',
  '桑山千雪',
  '芹沢あさひ',
  '黛冬優子',
  '和泉愛依',
  '浅倉透',
  '樋口円香',
  '市川雛菜',
  '福丸小糸',
  '七草にちか',
  '緋田美琴'
]

const seriesList = [
  {
    name: 'ワンデイシリーズ',
    regex: /ワンデイ(オフィサー|チーフ|キャプチャー)/
  },
  {
    name: 'ワンダーランドシリーズ',
    regex: /ワンダーランド(ホッピン|チェシャー|ハット|クイーン|アリス)/
  },
  {
    name: 'パジャマ・デシリーズ',
    regex: /パジャマ・デ・(カプ|ハム|ガオ|ペン|ワン){2}/
  },
  {
    name: 'ティータイムシリーズ',
    regex: /(キュー|テイス|ミン)ティータイムスイーツ/
  },
  {
    name: 'メリーメリーシリーズ',
    regex: /メリーメリー(デリバリー|ツリー|キャリー)/
  },
  {
    name: 'クラシカルシリーズ',
    regex: /クラシカル(メイド|マドモアゼル)/
  }
]

const query = `
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?name ?clothesName ?clothesDesc
WHERE {
  ?d rdf:type imas:Idol;
     imas:Brand ?brand;
     rdfs:label ?name;
     schema:owns ?owns.
  filter(contains(?brand, 'ShinyColors')).
  ?owns schema:name ?clothesName;
        schema:description ?clothesDesc.
}
order by ?name
`

async function fetch() {
  const url = `https://sparql.crssnky.xyz/spql/imas/query?output=json&query=${encodeURIComponent(
    query
  )}`

  try {
    const res = await axios.get(url)
    return res.data.results.bindings
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function main() {
  const data = await fetch()

  const poemData = data.map((e) => {
    const clothesName = e.clothesName.value
    let clothesTitle = e.clothesName.value

    // シリーズかチェック
    seriesList.forEach((v) => {
      if (v.regex.test(clothesName)) {
        clothesTitle = v.name
        return
      }
    })

    return {
      idolName: e.name.value,
      clothesTitle: clothesTitle,
      clothesName: clothesName,
      text: e.clothesDesc.value
    }
  })

  const sortedPoemData = poemData.sort(
    (a, b) => idolList.indexOf(a.idolName) - idolList.indexOf(b.idolName)
  )

  // 保存
  const exp = `import { Poem } from '../types/poem'\n\nexport const poemData: Poem[] = ${JSON.stringify(
    sortedPoemData,
    null,
    '  '
  )}`

  fs.writeFileSync('./data/poem-data.ts', exp)

  console.log('[ success! ]')
}

main()