import CopyButton from 'components/poems/button/copy'
import TweetButton from 'components/poems/button/tweet'

type Props = {
  tweetText: string
  copyText: string
}

const Buttons = ({ tweetText, copyText }: Props): JSX.Element => (
  <div className="flex flex-row">
    <TweetButton text={tweetText} />
    <CopyButton text={copyText} />
  </div>
)

export default Buttons
