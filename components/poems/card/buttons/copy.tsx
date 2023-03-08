import { useReducer } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";

type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  const [isCopied, toggleCopied] = useReducer((prev) => !prev, false);

  const copyToClipboard = async () => {
    if (isCopied) return;
    await navigator.clipboard.writeText(text);

    toggleCopied();
    setTimeout(() => toggleCopied(), 1500);
  };

  return (
    <button
      className="text-xl hover:text-black transition-colors focus:outline-none"
      title="コピーする"
      data-testid="copy-button"
      onClick={() => copyToClipboard()}
    >
      {isCopied ? <AiFillCheckCircle /> : <FiCopy />}
    </button>
  );
};

export default CopyButton;
