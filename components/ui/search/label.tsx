import { FiSearch } from 'react-icons/fi'

const Label = (): JSX.Element => (
  <div className="flex flex-row items-center justify-center mb-4 text-center text-2xl text-natural-black">
    <FiSearch className="mr-2" />
    <span className="tracking-wide">SEARCH</span>
  </div>
)

export default Label
