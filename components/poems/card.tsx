import { Poem } from '../../types/poem'
import CopyButton from './copy-button'
import TweetButton from './tweet-button'

type Props = {
  poem: Poem
  shouldShowButton: boolean
}

const Card = ({ poem, shouldShowButton }: Props) => {
  // 「。！」で分割する
  const poemText = poem.text
    .split(/(?<=。|！(?!！+))/)
    .map((e) => <p key={e}>{e.trim()}</p>)

  const shareUrl = `https://shiny-poems.vercel.app?id=${poem.id}`
  const hashtags = `#シャニマス #${poem.clothesName} #${poem.idolName}`

  const tweetText = `${poem.text}\n${hashtags}\n${shareUrl}`
  const copyText = `${poem.text} ${hashtags} ${shareUrl}`

  const buttons = (
    <div className="flex flex-row justify-center mt-3">
      <TweetButton text={tweetText} />
      <CopyButton text={copyText} />
    </div>
  )

  return (
    <div
      className="flex items-center justify-center m-2 p-1 w-96 h-56 rounded-md shadow-md bg-gray-50"
      key={poem.id}
    >
      <div className="text-center">
        <div className="font-bold text-xl">{poemText}</div>
        <div className="mt-3 text-sm">
          <p className="mb-1">『 {poem.clothesName} 』</p>
          <p>{poem.idolName}</p>
        </div>
        {shouldShowButton && buttons}
      </div>
    </div>
  )
}

export default Card
