type CardProps = {
  clothesName: string
  ownerName: string
  poem: string
}

const Card = (props: CardProps) => {
  // "。" と "！" で改行
  // 1つ以上重なっている "！" は無視する
  const poemText = props.poem
    .split(/(?<=。|！(?!！+))/)
    .map((e) => <p key={e}>{e.trim()}</p>)

  return (
    <div
      className="flex items-center justify-center m-2 w-96 h-48 rounded-md shadow-md bg-gray-50"
      key={props.poem}
    >
      <div className="text-center">
        <div className="mb-3 font-bold text-xl">{poemText}</div>
        <div className="text-sm">
          <p className="mb-1">『 {props.clothesName} 』</p>
          <p>{props.ownerName}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
