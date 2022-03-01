import { useReducer } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
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
      <button className="focus:outline-none" title="コピーする">
        {isCopied ? <AiFillCheckCircle size={20} /> : <FiCopy size={20} />}
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
