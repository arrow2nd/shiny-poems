import { FiDatabase } from "react-icons/fi";

import Link from "./link";

const Links = () => (
  <div className="mb-8 text-sm text-white">
    <Link href="https://sparql.crssnky.xyz/imas" title="im@sparql">
      <FiDatabase className="mr-2 text-2xl" />
    </Link>
  </div>
);

export default Links;
