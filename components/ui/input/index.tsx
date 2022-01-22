import { forwardRef } from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
  placeholder: string
  onSubmit: () => void
}

const Input = (props: Props, ref: React.MutableRefObject<any>) => {
  const handleKeyDown = (ev: any) => {
    // Enterが入力された
    if (ev.which === 13) {
      props.onSubmit()
    }
  }

  return (
    <div className="w-72 h-9 mx-1 my-2">
      <div className="flex items-center rounded-md transition-colors border border-gray-300 hover:border-gray-400 bg-white">
        <input
          className="w-full h-9 ml-2.5 rounded-md focus:outline-none"
          type="text"
          placeholder={props.placeholder}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
        <button
          className="mx-1 p-2 transition-colors text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={props.onSubmit}
        >
          <FiSearch />
        </button>
      </div>
    </div>
  )
}

export default forwardRef(Input)
