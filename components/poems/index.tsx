import { BsEmojiExpressionless } from "react-icons/bs";
import { Poem } from "types/poem";
import Card from "./card";

type Props = {
  items: Poem[];
};

const Poems = ({ items }: Props) => {
  const nothing = (
    <div className="flex flex-row items-center justify-center py-8 text-lg text-main md:text-xl">
      <BsEmojiExpressionless />
      <span className="ml-2" data-testid="poem-card-nothing">
        ポエムが見つかりません…
      </span>
    </div>
  );

  const cards = (
    <div className="flex flex-wrap justify-center">
      {items.map((e) => (
        <Card key={e.text} poem={e} />
      ))}
    </div>
  );

  return (
    <div className="mb-16 font-kiwi">{items.length ? cards : nothing}</div>
  );
};

export default Poems;
