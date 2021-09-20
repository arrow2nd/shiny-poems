import { Poem } from '../../../types/poem'
import { splitPoemText } from '../../../scripts/util'
import { colorList } from '../../../data/color-list'
import Accent from './accent'
import CopyButton from '../button/copy'
import TweetButton from '../button/tweet'

type Props = {
  poem: Poem
  shouldShowButton: boolean
}

const Card = ({ poem, shouldShowButton }: Props) => {
  const splitedPoem = splitPoemText(poem.text)
  const poemContents = splitedPoem.map((e) => <p key={e}>{e.trim()}</p>)

  const linkText = [
    `#シャニマス #${poem.clothesName} #${poem.idolName}`,
    `https://shiny-poems.vercel.app?id=${poem.id}`
  ]
  const tweetText = [splitedPoem.join('\n'), ...linkText].join('\n')
  const copyText = [poem.text, ...linkText].join(' ')

  const buttons = (
    <div className="flex flex-row text-md">
      <TweetButton text={tweetText} />
      <CopyButton text={copyText} />
    </div>
  )

  const idolColor = colorList.find((e) => e.idolName === poem.idolName)
  const accentColor = idolColor ? idolColor.hex : '78aeff'

  return (
    <div
      className="flex items-center text-left w-96 h-60 m-1.5 md:m-3 rounded-md shadow-md bg-white text-natural-black"
      key={poem.id}
    >
      <div className="mx-8">
        <div className="my-3 text-base md:text-xl">{poemContents}</div>
        <Accent bgColor={accentColor} />
        <div className="my-4">
          <p className="mb-1 text-sm md:text-base">{poem.clothesName}</p>
          <p className="text-xs md:text-sm">{poem.idolName}</p>
        </div>
        {shouldShowButton && buttons}
      </div>
    </div>
  )
}

export default Card
