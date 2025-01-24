import { ComponentPropsWithRef, type JSX } from "react";
import { FiSearch } from "react-icons/fi";

const Input = (props: ComponentPropsWithRef<"input">): JSX.Element => {
  return (
    <form
      className="text-main relative inline-flex w-full items-center lg:w-72"
      id="search"
      role="search"
    >
      <input name="type" type="hidden" value="poem" />
      <input
        className="border-main placeholder-sub m-2 h-10 w-full rounded-md border-2 p-2 pr-8 focus:outline-hidden"
        type="text"
        data-testid="poem-textbox"
        {...props}
      />
      <button
        className="absolute right-5 text-lg transition-colors"
        data-testid="poem-submit-button"
        type="submit"
      >
        <FiSearch />
      </button>
    </form>
  );
};

export default Input;
