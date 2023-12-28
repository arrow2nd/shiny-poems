"use client";

import { FiShare2 } from "react-icons/fi";

type Props = {
  text: string;
};

const TweetButton = ({ text }: Props) => {
  const encodedText = encodeURIComponent(text);
  const tweetUrl = `https://しぇあ.com?text=${encodedText}`;

  return (
    <a
      className="text-xl transition-colors hover:text-black"
      title="シェアする"
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FiShare2 />
    </a>
  );
};

export default TweetButton;
