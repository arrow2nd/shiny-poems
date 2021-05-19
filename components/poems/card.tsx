import { Poem } from '../../types/poem'
import { splitText } from '../../scripts/util'
import CopyButton from './copy-button'
import TweetButton from './tweet-button'

type Props = {
  poem: Poem
  shouldShowButton: boolean
}

const Card = ({ poem, shouldShowButton }: Props) => {
  const splited = splitText(poem.text)
  const poemText = splited.map((e) => <p key={e}>{e.trim()}</p>)

  const shareUrl = `https://shiny-poems.vercel.app?id=${poem.id}`
  const hashtags = `#シャニマス #${poem.clothesName} #${poem.idolName}`

  const tweetText = `${poem.text}\n${hashtags}\n${shareUrl}`
  const copyText = `${poem.text} ${hashtags} ${shareUrl}`

  const buttons = (
    <div className="flex flex-row text-sm">
      <TweetButton text={tweetText} />
      <CopyButton text={copyText} />
    </div>
  )

  return (
    <div
      className="flex items-center text-left m-3 w-96 h-60 rounded-md shadow-md bg-white text-natural-black"
      key={poem.id}
    >
      <div className="mx-8">
        <div className="my-4">
          <p className="font-bold text-xl">{poemText}</p>
        </div>
        <div className="py-0.5 w-10 rounded-full bg-shiny" />
        <div className="my-4">
          <p className="mb-1 text-md"> {poem.clothesName} </p>
          <p className="text-xs">{poem.idolName}</p>
        </div>
        {shouldShowButton && buttons}
      </div>
    </div>
  )
}

export default Card
