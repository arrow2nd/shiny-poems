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
    <div className="w-72 my-4">
      <div className="flex items-center rounded-md border-2 border-main text-main bg-white">
        <input
          className="w-full h-9 ml-2.5 placeholder-sub rounded-md focus:outline-none"
          type="text"
          placeholder={props.placeholder}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
        <button
          className="mx-1 p-2 transition-colors focus:outline-none"
          onClick={props.onSubmit}
        >
          <FiSearch />
        </button>
      </div>
    </div>
  )
}

export default forwardRef(Input)
