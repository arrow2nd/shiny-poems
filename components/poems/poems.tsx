import { Poem } from '../../types/poem'
import Card from './card'

type PoemsProps = {
  items: Poem[]
}

const Poems = (props: PoemsProps) => {
  // ようこそメッセージ
  const wellcomeCard = (
    <Card
      clothesName="ようこそ！"
      ownerName="📔"
      poem="↑から検索してください..."
      key="nothing"
    />
  )

  const cards = props.items.map((e) => (
    <Card
      clothesName={e.clothesName}
      ownerName={e.ownName}
      poem={e.text}
      key={e.text}
    />
  ))

  return (
    <div className="flex flex-wrap justify-center mt-2">
      {cards.length ? cards : wellcomeCard}
    </div>
  )
}

export default Poems
