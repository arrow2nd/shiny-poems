import { RiTwitterLine } from 'react-icons/ri'

type Props = {
  text: string
}

const TweetButton = ({ text }: Props) => {
  const encodedText = encodeURIComponent(text + '\n')
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`

  return (
    <a className="mr-2" href={tweetUrl} target="_blank" rel="noopener">
      <RiTwitterLine />
    </a>
  )
}

export default TweetButton
