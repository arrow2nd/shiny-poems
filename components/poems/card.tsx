import { Poem } from '../../types/poem'
import { splitText } from '../../scripts/util'
import { colorList } from '../../data/color-list'
import CopyButton from './copy-button'
import TweetButton from './tweet-button'

type Props = {
  poem: Poem
  shouldShowButton: boolean
}

const Card = ({ poem, shouldShowButton }: Props) => {
  const splited = splitText(poem.text)
  const poemContent = splited.map((e) => <p key={e}>{e.trim()}</p>)

  const shareUrl = `https://shiny-poems.vercel.app?id=${poem.id}`
  const hashtags = `#シャニマス #${poem.clothesName} #${poem.idolName}`

  const tweetText = `${poem.text}\n${hashtags}\n${shareUrl}`
  const copyText = `${poem.text} ${hashtags} ${shareUrl}`

  const idolColor = colorList.find((e) => e.idolName === poem.idolName)
  const bgColorClass = idolColor ? idolColor.className : 'bg-shiny'

  const buttons = (
    <div className="flex flex-row text-sm">
      <TweetButton text={tweetText} />
      <CopyButton text={copyText} />
    </div>
  )

  return (
    <div
      className="flex items-center text-left w-96 h-60 m-1.5 md:m-3 rounded-md shadow-md bg-white text-natural-black"
      key={poem.id}
    >
      <div className="mx-8">
        <div className="font-bold my-4 text-base md:text-xl">{poemContent}</div>
        <div
          className={`py-0.5 w-10 rounded-full border border-gray-100 ${bgColorClass}`}
        />
        <div className="my-4">
          <p className="mb-1 text-sm md:text-base">{poem.clothesName}</p>
          <p className="text-xs">{poem.idolName}</p>
        </div>
        {shouldShowButton && buttons}
      </div>
    </div>
  )
}

export default Card
