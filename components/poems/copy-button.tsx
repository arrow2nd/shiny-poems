import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
      <button
        className={`focus:outline-none ${
          isCopied ? 'ol-confirm-f' : 'ol-copy-o'
        }`}
        onClick={handleClickCopy}
      />
    </CopyToClipboard>
  )
}

export default CopyButton
