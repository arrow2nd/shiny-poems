import { ComponentPropsWithRef } from "react";
import { FiSearch } from "react-icons/fi";

export default function input(
  props: ComponentPropsWithRef<"input">
): JSX.Element {
  return (
    <div className="m-2 flex w-full items-center rounded-md border-2 border-main bg-white text-main lg:w-72">
      <input
        {...props}
        className="ml-2.5 h-9 w-full rounded-md placeholder-sub focus:outline-none"
        type="text"
        data-testid="poem-textbox"
      />
      <button
        className="mx-1 p-2 transition-colors focus:outline-none"
        data-testid="poem-submit-button"
        type="submit"
      >
        <FiSearch />
      </button>
    </div>
  );
}
