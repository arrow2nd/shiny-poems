import { ParsedUrlQuery } from 'node:querystring'
import { splitText, encode } from './util'
import { poemList } from '../data/poem-list'
import { colorList } from '../data/color-list'
import cloudinary from 'cloudinary'

export const generateOgpImageUrl = (query: ParsedUrlQuery): string => {
  const defaultOgp = 'https://shiny-poems.vercel.app/ogp-home.png'

  // クエリからidを取得
  const id = query.id || ''
  const idStr = Array.isArray(id) ? '' : id
  if (!idStr) return defaultOgp

  // idからポエムを取得
  const poem = poemList.find((e) => e.id === idStr)
  if (!poem) return defaultOgp

  // アイドル名からイメージカラーを取得
  const idolColor = colorList.find((e) => e.idolName === poem.idolName)

  const poemText = splitText(poem.text).join('\n')

  return cloudinary.v2.url('shiny-poems/ogp-base.png', {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ['$poem', `!${encode(poemText)}!`],
          ['$clothes', `!${encode(poem.clothesName)}!`],
          ['$idol', `!${encode(poem.idolName)}!`],
          ['$color', `!rgb:${idolColor.hex}!`]
        ]
      },
      {
        transformation: ['poem-ogp']
      }
    ]
  })
}
