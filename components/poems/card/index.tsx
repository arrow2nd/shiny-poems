import { splitPoemText } from "libs/utils";
import { colors } from "data/colors";
import { SiteInfo } from "data/site";
import { Poem } from "types/poem";
import Accent from "./accent";
import Buttons from "./buttons";

type Props = {
  poem: Poem;
};

const Card = ({ poem }: Props) => {
  const splittedPoem = splitPoemText(poem.text);
  const poemContents = splittedPoem.map((e) => <p key={e}>{e.trim()}</p>);

  const linkText = [
    `#シャニマス #${poem.clothesName} #${poem.idolName}`,
    `${SiteInfo.url}?id=${poem.id}`
  ];

  const texts = {
    tweetText: [...splittedPoem, ...linkText].join("\n"),
    copyText: [poem.text, ...linkText].join(" ")
  };

  const idolColor = colors.find((e) => e.idolName === poem.idolName);
  const accentColor = idolColor ? idolColor.hex : "78aeff";

  return (
    <div
      className="relative m-2 flex h-60 w-96 items-center rounded-md border-2 border-main bg-white p-8 text-main"
      key={poem.id}
    >
      <div>
        <div className="mb-4 text-lg md:text-xl" data-testid="poem-card-text">
          {poemContents}
        </div>
        <Accent bgColor={accentColor} />
        <div>
          <p
            className="mb-1 text-sm md:text-base"
            data-testid="poem-card-clothe"
          >
            {poem.clothesName}
          </p>
          <p className="text-xs md:text-sm" data-testid="poem-card-idol">
            {poem.idolName}
          </p>
        </div>
      </div>
      <Buttons {...texts} />
    </div>
  );
};

export default Card;
