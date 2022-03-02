import cloudinary from 'cloudinary'
import { ParsedUrlQuery } from 'node:querystring'

import { colorList } from 'data/color-list'
import { poemList } from 'data/poem-list'

import { encodeForCloudinary, splitPoemText } from './util'

/**
 * OGP画像のURLを生成
 * @param query URLクエリ
 * @returns [OGP画像のURL, ポエムテキスト]
 */
export const generateOgpImageUrl = (
  query: ParsedUrlQuery
): [string, string] => {
  const defaultOgp = 'https://shiny-poems.vercel.app/ogp-default.png'

  // クエリからidを取得
  const id = query.id || ''
  const idStr = Array.isArray(id) ? '' : id
  if (!idStr) return [defaultOgp, '']

  // idからポエムを取得
  const poem = poemList.find((e) => e.id === idStr)
  if (!poem) return [defaultOgp, '']

  // アイドル名からイメージカラーを取得
  const idolColor = colorList.find((e) => e.idolName === poem.idolName)
  const poemText = splitPoemText(poem.text).join('\n')

  const ogpImgUrl = cloudinary.v2.url('shiny-poems/ogp-base.png', {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ['$color', `!rgb:${idolColor.hex}!`],
          ['$poem', `!${encodeForCloudinary(poemText)}!`],
          ['$clothes', `!${encodeForCloudinary(poem.clothesName)}!`],
          ['$idol', `!${encodeForCloudinary(poem.idolName)}!`]
        ]
      },
      {
        transformation: ['poem-ogp']
      }
    ]
  })

  return [ogpImgUrl, poem.text]
}
