import { FiSearch } from "react-icons/fi";

const Label = (): JSX.Element => (
  <div className="flex flex-row items-center ml-2 mb-4 text-2xl text-main">
    <FiSearch className="mr-2" />
    <span className="tracking-widest">Search</span>
  </div>
);

export default Label;
