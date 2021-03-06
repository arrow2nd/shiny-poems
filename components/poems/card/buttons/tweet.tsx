import { FiTwitter } from 'react-icons/fi'

type Props = {
  text: string
}

const TweetButton = ({ text }: Props) => {
  const encodedText = encodeURIComponent(text)
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`

  return (
    <a
      className="text-xl hover:text-black transition-colors"
      title="ツイートする"
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FiTwitter />
    </a>
  )
}

export default TweetButton
