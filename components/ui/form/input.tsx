import { ComponentPropsWithRef } from "react";
import { FiSearch } from "react-icons/fi";

export default function input(
  props: ComponentPropsWithRef<"input">
): JSX.Element {
  return (
    <div className="w-full lg:w-72 m-2 flex items-center rounded-md border-2 border-main text-main bg-white">
      <input
        {...props}
        className="w-full h-9 ml-2.5 placeholder-sub rounded-md focus:outline-none"
        type="text"
        data-testid="poem-search-textbox"
      />
      <button
        className="mx-1 p-2 transition-colors focus:outline-none"
        data-testid="poem-search-submit"
      >
        <FiSearch />
      </button>
    </div>
  );
}
