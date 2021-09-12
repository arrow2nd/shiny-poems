import { Poem } from '../../types/poem'
import { splitText } from '../../scripts/util'
import { colorList } from '../../data/color-list'
import Accent from './accent'
import CopyButton from './copy-button'
import TweetButton from './tweet-button'

type Props = {
  poem: Poem
  shouldShowButton: boolean
}

const Card = ({ poem, shouldShowButton }: Props) => {
  const poemContents = splitText(poem.text).map((e) => (
    <p key={e}>{e.trim()}</p>
  ))
  const textContents = [
    poem.text,
    `#シャニマス #${poem.clothesName} #${poem.idolName}`,
    `https://shiny-poems.vercel.app?id=${poem.id}`
  ]

  const tweetText = textContents.join('\n')
  const copyText = textContents.join(' ')

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
