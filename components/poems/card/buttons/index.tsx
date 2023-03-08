import CopyButton from "./copy";
import TweetButton from "./tweet";

type Props = {
  tweetText: string;
  copyText: string;
};

const Buttons = ({ tweetText, copyText }: Props): JSX.Element => (
  <div
    className={`absolute right-0 bottom-0 p-8 flex flex-row space-x-4 text-main`}
  >
    <TweetButton text={tweetText} />
    <CopyButton text={copyText} />
  </div>
);

export default Buttons;
