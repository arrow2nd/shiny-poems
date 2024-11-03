import type { JSX } from "react";
import { FiSearch } from "react-icons/fi";

const Label = (): JSX.Element => (
  <div className="mb-4 ml-2 flex flex-row items-center text-2xl text-main">
    <FiSearch className="mr-2" />
    <span className="tracking-widest">Search</span>
  </div>
);

export default Label;
