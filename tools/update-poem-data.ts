import { writeFileSync } from "fs";

import type { Poem } from "types/poem";

import { poemList } from "../data/poem-list";
import { clothesSeries, units } from "./libs/data";
import { fetchIdolData } from "./libs/fetch";

/**
 * SPARQLクエリ（衣装ポエムを全件取得）
 *
 * NOTE: どのゲームに登場した衣装なのかが判別できないので
 * 暫定的に衣装説明が1文字以上40文字未満のもののみを取得
 */
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
`;

function getJSTDate(): string {
  const diffJstMin = 9 * 60;
  const jstTimeStamp =
    Date.now() + (new Date().getTimezoneOffset() + diffJstMin) * 60 * 1000;

  const jst = new Date(jstTimeStamp);
  const month = (jst.getMonth() + 1).toString().padStart(2, "0");
  const date = jst.getDate().toString().padStart(2, "0");

  return `${jst.getFullYear()}/${month}/${date} (JST)`;
}

(async () => {
  const data = await fetchIdolData(query);

  const poem: Poem[] = data.map((e): Poem => {
    const id: string = e.owns.value.match(/detail\/(.+)$/)[1];
    const clothesName: string = e.clothesName.value;

    // シリーズ衣装ならシリーズ名をタイトル名にする
    const series = clothesSeries.find((e) => e.regex.test(clothesName));
    const clothesTitle = series ? series.name : clothesName;

    return {
      id,
      idolName: e.name.value,
      clothesTitle,
      clothesName,
      text: e.clothesDesc.value
    };
  });

  // アイドル名リストに沿ってソート
  const sortedIdols = units.flatMap((u) => u.members);
  const sortedPoem = poem.sort(
    (a, b) => sortedIdols.indexOf(a.idolName) - sortedIdols.indexOf(b.idolName)
  );

  const oldData = JSON.stringify(poemList, null, "\t");
  const newData = JSON.stringify(sortedPoem, null, "\t");

  if (newData === oldData) {
    console.log("[ no update ]");
    return;
  }

  const result = `import { Poem } from "types/poem";
export const updatedAtUTC = "${getJSTDate()}";
export const poemList: Poem[] = ${newData}`;

  writeFileSync("./data/poem-list.ts", result);

  console.log("[ update success! ]");
})();
