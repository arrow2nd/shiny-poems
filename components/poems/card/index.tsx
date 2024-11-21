import Link from "next/link";
import { generateSearchQueryPath } from "libs/url";
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
  const splitPoem = splitPoemText(poem.text);
  const poemContents = splitPoem.map((e) => <p key={e}>{e.trim()}</p>);

  const linkText = [
    `#シャニマス #${poem.clothesName} #${poem.idolName}`,
    `${SiteInfo.url}?id=${poem.id}`
  ];

  const texts = {
    tweetText: [...splitPoem, ...linkText].join("\n"),
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
        <div className="space-y-2">
          <Link
            className="block text-sm underline decoration-dashed decoration-1 underline-offset-4 transition-colors hover:text-black md:text-base"
            href={generateSearchQueryPath("clothe", poem.clothesName)}
            data-testid="poem-card-clothe"
          >
            {poem.clothesName}
          </Link>
          <Link
            className="block text-xs underline decoration-dashed decoration-1 underline-offset-4 transition-colors hover:text-black md:text-sm"
            href={generateSearchQueryPath("idol", poem.idolName)}
            data-testid="poem-card-idol"
          >
            {poem.idolName}
          </Link>
        </div>
      </div>
      <Buttons {...texts} />
    </div>
  );
};

export default Card;
