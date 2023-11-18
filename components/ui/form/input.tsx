import { ComponentPropsWithRef } from "react";
import { FiSearch } from "react-icons/fi";

const Input = (props: ComponentPropsWithRef<"input">): JSX.Element => {
  return (
    <div className="relative flex w-full items-center text-main">
      <input
        {...props}
        className="m-2 w-full rounded-md border-2 border-main  p-2 placeholder-sub focus:ring-4 lg:w-72"
        type="text"
        data-testid="poem-textbox"
      />
      <button
        className="absolute right-5 text-lg transition-colors"
        data-testid="poem-submit-button"
        type="submit"
      >
        <FiSearch />
      </button>
    </div>
  );
};

export default Input;
