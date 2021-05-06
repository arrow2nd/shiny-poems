import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiCopy } from 'react-icons/fi'
import { AiOutlineCheckCircle } from 'react-icons/ai'

type Props = {
  text: string
}

const CopyButton = (props: Props) => {
  const [isCopied, setCopied] = useState(false)

  const handleClickCopy = () => {
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <CopyToClipboard text={props.text}>
      <button className="focus:outline-none" onClick={handleClickCopy}>
        {isCopied ? <AiOutlineCheckCircle /> : <FiCopy />}
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
