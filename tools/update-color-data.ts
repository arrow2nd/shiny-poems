import { writeFileSync } from "fs";

import { Color } from "types/color";

import { fetchIdolData } from "./libs/fetch";

/** SPARQLクエリ（シャニマスアイドルの個人カラー） */
const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?name ?color
WHERE {
  ?d rdf:type imas:Idol;
     imas:Brand ?brand;
     rdfs:label ?name;
     imas:nameKana ?kana;
     imas:Color ?color.
  filter(contains(?brand, 'ShinyColors'))
}
order by ?kana
`;

(async () => {
  const data = await fetchIdolData(query);

  const colorData: Color[] = data.map(
    (e): Color => ({
      idolName: e.name.value,
      hex: e.color.value
    })
  );

  const json = JSON.stringify(colorData, null, "  ");
  const result = `import { Color } from 'types/color'\n\nexport const colorList: Color[] = ${json}`;

  writeFileSync("./data/color-list.ts", result);

  console.log("[ success! ]");
})();
