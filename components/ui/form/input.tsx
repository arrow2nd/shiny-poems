import { ComponentPropsWithRef, type JSX } from "react";
import { FiSearch } from "react-icons/fi";

const Input = (props: ComponentPropsWithRef<"input">): JSX.Element => {
  return (
    <form
      className="relative inline-flex w-full items-center text-main lg:w-72"
      id="search"
      role="search"
    >
      <input name="type" type="hidden" value="poem" />
      <input
        className="m-2 h-10 w-full rounded-md border-2 border-main p-2 pr-8 placeholder-sub focus:ring-4"
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
