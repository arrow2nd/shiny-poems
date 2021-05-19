import { forwardRef } from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
  placeholder: string
  onSubmit: () => void
}

const Input = forwardRef((props: Props, ref: React.MutableRefObject<any>) => {
  const handleKeyDown = (ev: any) => {
    // Enterが入力された
    if (ev.which === 13) {
      props.onSubmit()
    }
  }

  return (
    <div className="w-72 m-1">
      <div className="flex items-center rounded-md border border-gray-300 bg-white">
        <input
          className="w-full h-9 p-4 rounded-md focus:outline-none"
          type="text"
          placeholder={props.placeholder}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
        <button
          className="mx-1 p-2 text-gray-500 hover:text-gray-400 focus:outline-none"
          onClick={props.onSubmit}
        >
          <FiSearch />
        </button>
      </div>
    </div>
  )
})

export default Input
