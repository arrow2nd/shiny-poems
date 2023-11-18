import { FiCode, FiDatabase } from "react-icons/fi";

import Link from "./link";

const Links = () => (
  <div className="mb-8 space-y-2 text-sm text-white">
    <Link title="arrow2nd" href="https://github.com/arrow2nd">
      <FiCode className="mr-2 text-2xl" />
    </Link>
    <Link href="https://sparql.crssnky.xyz/imas" title="im@sparql">
      <FiDatabase className="mr-2 text-2xl" />
    </Link>
  </div>
);

export default Links;
