import axios from 'axios'

/**
 * imasparql にクエリを投げる
 *
 * @param query 検索クエリ
 * @returns 検索結果
 */
export async function fetchIdolData(query: string) {
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
