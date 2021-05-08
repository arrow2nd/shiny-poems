import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiCopy } from 'react-icons/fi'
import { AiOutlineCheckCircle } from 'react-icons/ai'

type Props = {
  text: string
}

const CopyButton = ({ text }: Props) => {
  const [isCopied, setCopied] = useState(false)

  const handleClickCopy = () => {
    if (isCopied) return

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <CopyToClipboard text={text} onCopy={handleClickCopy}>
      <button className="focus:outline-none">
        {isCopied ? <AiOutlineCheckCircle /> : <FiCopy />}
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
