import { Poem } from '../../types/poem'
import Card from './card'

type Props = {
  items: Poem[]
}

const Poems = ({ items }: Props) => {
  const nothingCard = (
    <Card
      key="nothing"
      poem={{
        id: '',
        idolName: '',
        clothesTitle: '',
        clothesName: 'なんもないわ',
        text: 'ポエムがみつかりませんでした'
      }}
      shouldShowButton={false}
    />
  )

  const cards = items.map((e) => (
    <Card key={e.text} poem={e} shouldShowButton={true} />
  ))

  return (
    <div className="flex flex-wrap justify-center mb-16">
      {cards.length ? cards : nothingCard}
    </div>
  )
}

export default Poems
