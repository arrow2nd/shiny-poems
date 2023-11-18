import CopyButton from "./copy";
import TweetButton from "./tweet";

type Props = {
  tweetText: string;
  copyText: string;
};

const Buttons = ({ tweetText, copyText }: Props): JSX.Element => (
  <div
    className={`absolute bottom-0 right-0 flex flex-row space-x-4 p-8 text-main`}
  >
    <TweetButton text={tweetText} />
    <CopyButton text={copyText} />
  </div>
);

export default Buttons;
