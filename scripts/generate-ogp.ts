import { ParsedUrlQuery } from 'node:querystring'
import { poemList } from '../data/poem-list'
import cloudinary from 'cloudinary'

export const generateOgpImageUrl = (query: ParsedUrlQuery): string => {
  const id = query.id || ''
  const idStr = Array.isArray(id) ? '' : id

  // idがない場合デフォルトのOGP画像のURLを返す
  if (!idStr) return 'https://shiny-poems.vercel.app/ogp-home.png'

  const poem = poemList.find((e) => e.id === idStr)
  const text = poem.text.replace(/(?<=。|！(?!！+))(?<!$)/, '\n') // 末尾以外の「。！」で改行
  const subtext = `${poem.clothesName} / ${poem.idolName}`

  const encode = (str: string) =>
    encodeURIComponent(str.replace(/\,/g, '%2C').replace(/\//g, '%2F'))

  return cloudinary.v2.url('shiny-poems/ogp.png', {
    secure: true,
    sign_url: true,
    transformation: [
      {
        variables: [
          ['$text', `!${encode(text)}!`],
          ['$subtext', `!${encode(subtext)}!`]
        ]
      },
      {
        transformation: ['poem']
      }
    ]
  })
}
