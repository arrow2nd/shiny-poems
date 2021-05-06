import { RiTwitterLine } from 'react-icons/ri'

type Props = {
  text: string
  hashtags: string
}

const TweetButton = (props: Props) => {
  const tweetText = encodeURIComponent(props.text + '\n')
  const hashtags = encodeURIComponent(props.hashtags)
  const url = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=${hashtags}`

  return (
    <a className="mr-2" href={url} target="_blank" rel="noopener">
      <RiTwitterLine />
    </a>
  )
}

export default TweetButton
