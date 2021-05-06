import { RiTwitterLine } from 'react-icons/ri'

import CopyButton from './copy-button'

type Props = {
  clothesName: string
  ownerName: string
  poem: string
  shouldShowButton: boolean
}

const Card = (props: Props) => {
  // 「。！」で改行 （1つ以上重なっている場合は無視）
  const poemText = props.poem
    .split(/(?<=。|！(?!！+))/)
    .map((e) => <p key={e}>{e.trim()}</p>)

  const tweetText = encodeURIComponent(
    `${props.poem}\n（${props.clothesName} / ${props.ownerName}）`
  )

  const copyText = `${props.poem} （${props.clothesName} / ${props.ownerName}）`

  const buttons = (
    <div className="flex flex-row justify-center mt-3">
      <a
        className="mr-2"
        href={'https://twitter.com/intent/tweet?text=' + tweetText}
        target="_blank"
        rel="noopener"
      >
        <RiTwitterLine />
      </a>
      <CopyButton text={copyText} />
    </div>
  )

  return (
    <div
      className="flex items-center justify-center m-2 w-96 h-56 rounded-md shadow-md bg-gray-50"
      key={props.poem}
    >
      <div className="text-center">
        <div className="font-bold text-xl">{poemText}</div>
        <div className="mt-3 text-sm">
          <p className="mb-1">『 {props.clothesName} 』</p>
          <p>{props.ownerName}</p>
        </div>
        {props.shouldShowButton && buttons}
      </div>
    </div>
  )
}

export default Card
