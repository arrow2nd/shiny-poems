import { RiTwitterLine } from 'react-icons/ri'

type Props = {
  text: string
}

const TweetButton = ({ text }: Props) => {
  const encodedText = encodeURIComponent(text)
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`

  return (
    <a
      className="mr-2 transition-colors text-natural-black hover:text-gray-800"
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <RiTwitterLine />
    </a>
  )
}

export default TweetButton
