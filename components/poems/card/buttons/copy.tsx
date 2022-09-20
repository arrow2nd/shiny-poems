import { useReducer } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'

type Props = {
  text: string
}

const CopyButton = ({ text }: Props) => {
  const [isCopied, toggleCopied] = useReducer((prev) => !prev, false)

  const handleClickCopy = () => {
    if (isCopied) return
    toggleCopied()
    setTimeout(() => toggleCopied(), 1500)
  }

  return (
    <CopyToClipboard text={text} onCopy={handleClickCopy}>
      <button
        className="text-xl hover:text-black transition-colors focus:outline-none"
        title="コピーする"
        data-testid="copy-button"
      >
        {isCopied ? <AiFillCheckCircle /> : <FiCopy />}
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
