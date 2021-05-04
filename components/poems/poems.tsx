import { Poem } from '../../types/poem'
import Card from './card'

type PoemsProps = {
  items: Poem[]
}

const Poems = (props: PoemsProps) => {
  const cards = props.items.map((e) => (
    <Card
      clothesName={e.clothesName}
      ownerName={e.ownName}
      poem={e.text}
      key={e.text}
    />
  ))

  return <div className="flex flex-wrap justify-center mt-2">{cards}</div>
}

export default Poems
