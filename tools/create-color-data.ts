import fs from 'fs'

import { Color } from 'types/color'

import { fetchIdolData } from './util'

const query = `
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?name ?gname ?color
WHERE {
  ?d rdf:type imas:Idol;
     imas:Brand ?brand;
     rdfs:label ?name;
     schema:givenName ?gname;
     imas:Color ?color.
  filter(contains(?brand, 'ShinyColors'))
  filter(lang(?gname)="en")
}
order by ?gname
`

async function main() {
  const data = await fetchIdolData(query)

  const colorData: Color[] = data.map(
    (e): Color => ({
      idolName: e.name.value,
      hex: e.color.value
    })
  )

  // 保存
  const result = `import { Color } from 'types/color'\n\nexport const colorList: Color[] = ${JSON.stringify(
    colorData,
    null,
    '  '
  )}`

  fs.writeFileSync('./data/color-list.ts', result)

  console.log('[ success! ]')
}

main()
