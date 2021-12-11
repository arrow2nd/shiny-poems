import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'

type Props = {
  text: string
}

const CopyButton = ({ text }: Props) => {
  const [isCopied, setCopied] = useState(false)

  const handleClickCopy = () => {
    if (isCopied) return

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <CopyToClipboard text={text} onCopy={handleClickCopy}>
      <button
        className="text-natural-black hover:text-black focus:outline-none transition-colors"
        title="コピーする"
      >
        {isCopied ? <AiOutlineCheckCircle /> : <FiCopy />}
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
