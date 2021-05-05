import { Poem } from '../../types/poem'
import Card from './card'

type PoemsProps = {
  items: Poem[]
}

const Poems = (props: PoemsProps) => {
  // ようこそメッセージ
  const wellcomeCard = (
    <Card
      key="nothing"
      clothesName="ようこそ！"
      ownerName="📔"
      poem="↑から検索してください"
      shouldShowButton={false}
    />
  )

  const cards = props.items.map((e) => (
    <Card
      key={e.text}
      clothesName={e.clothesName}
      ownerName={e.ownName}
      poem={e.text}
      shouldShowButton={true}
    />
  ))

  return (
    <div className="flex flex-wrap justify-center mt-2">
      {cards.length ? cards : wellcomeCard}
    </div>
  )
}

export default Poems
