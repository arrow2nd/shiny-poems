import { Poem } from 'types/poem'

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
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16 font-kiwi">
      {cards.length ? cards : nothingCard}
    </div>
  )
}

export default Poems
