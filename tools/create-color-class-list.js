'use strict'
const fs = require('fs')
const { fetchIdolData } = require('./util')

const query = `
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?name ?gname ?colorCode
WHERE {
  ?d rdf:type imas:Idol;
     imas:Brand ?brand;
     rdfs:label ?name;
     schema:givenName ?gname;
     imas:Color ?color.
     bind(concat("#", str(?color)) as ?colorCode).
     filter(contains(?brand, 'ShinyColors')).
     filter(lang(?gname)="en")
}
order by ?gname
`

async function main() {
  const data = await fetchIdolData(query)

  const color = data.map((e) => ({
    idolName: e.name.value,
    className: `bg-${e.gname.value.toLowerCase()}`
  }))

  const css = data.map(
    (e) =>
      `.bg-${e.gname.value.toLowerCase()} { background-color: ${
        e.colorCode.value
      } }\n`
  )

  // 保存
  const colorClassList = `import { ColorClass } from '../types/color-class'\n\nexport const colorClassList: ColorClass[] = ${JSON.stringify(
    color,
    null,
    '  '
  )}`

  fs.writeFileSync('./data/color-class-list.ts', colorClassList)
  fs.writeFileSync('./styles/idol-color.css', css.join('\n'))

  console.log('[ success! ]')
}

main()
