import {
  InputHTMLAttributes,
  KeyboardEventHandler,
  forwardRef,
  useState
} from "react";
import { FiSearch } from "react-icons/fi";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit: () => void;
};

const Input = (props: Props, ref: React.MutableRefObject<HTMLInputElement>) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    // 入力が確定した
    if (!isTyping && ev.key === "Enter") {
      props.onSubmit();
      ev.preventDefault();
      ev.currentTarget.blur();
    }
  };

  return (
    <div className="w-full lg:w-72 m-2">
      <div className="flex items-center rounded-md border-2 border-main text-main bg-white">
        <input
          {...props}
          className="w-full h-9 ml-2.5 placeholder-sub rounded-md focus:outline-none"
          type="text"
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsTyping(true)}
          onCompositionEnd={() => setIsTyping(false)}
          data-testid="poem-search-textbox"
          ref={ref}
        />
        <button
          className="mx-1 p-2 transition-colors focus:outline-none"
          onClick={props.onSubmit}
          data-testid="poem-search-submit"
        >
          <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default forwardRef(Input);
