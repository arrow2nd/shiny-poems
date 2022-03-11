import Accent from 'components/poems/card/accent'

import { splitPoemText } from 'scripts/util'

import { colorList } from 'data/color-list'

import { Poem } from 'types/poem'

import Buttons from './buttons'

type Props = {
  poem: Poem
}

const Card = ({ poem }: Props) => {
  const splitedPoem = splitPoemText(poem.text)
  const poemContents = splitedPoem.map((e) => <p key={e}>{e.trim()}</p>)

  // テキスト
  const linkText = [
    `#シャニマス #${poem.clothesName} #${poem.idolName}`,
    `https://shiny-poems.vercel.app?id=${poem.id}`
  ]
  const tweetText = [...splitedPoem, ...linkText].join('\n')
  const copyText = [poem.text, ...linkText].join(' ')

  // 色
  const idolColor = colorList.find((e) => e.idolName === poem.idolName)
  const accentColor = idolColor ? idolColor.hex : '78aeff'

  return (
    <div
      className="relative flex items-center w-96 h-60 m-2 p-8 border-2 border-main rounded-md bg-white text-main"
      key={poem.id}
    >
      <div>
        <div className="mb-4 text-lg md:text-xl" data-testid="poem-card-text">
          {poemContents}
        </div>
        <Accent bgColor={accentColor} />
        <div>
          <p className="mb-1 text-sm md:text-base">{poem.clothesName}</p>
          <p className="text-xs md:text-sm">{poem.idolName}</p>
        </div>
      </div>
      <Buttons {...{ tweetText, copyText }} />
    </div>
  )
}

export default Card
