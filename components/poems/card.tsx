type CardProps = {
  clothesName: string
  ownerName: string
  poem: string
}

const Card = (props: CardProps) => {
  const poemText = props.poem
    .split(/(?<=[。！])/)
    .map((e) => <p key={e}>{e}</p>)

  return (
    <div
      className="m-2 w-72 rounded-md shadow-md bg-gray-50 text-center"
      key={props.poem}
    >
      <div className="p-4">
        <div className="px-5 pt-2 pb-5 font-bold text-xl">{poemText}</div>
        <div className="text-xs">
          <p className="mb-1">{props.clothesName}</p>
          <p>{props.ownerName}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
