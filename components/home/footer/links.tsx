import { FaCode, FaDatabase } from 'react-icons/fa'

import Link from './link'

const Links = () => (
  <div className="mb-6 text-sm text-white">
    <Link
      className="mb-2"
      title="GitHub"
      href="https://github.com/arrow2nd/shiny-poems"
    >
      <FaCode className="mr-2 text-2xl" />
      <span> by arrow2nd</span>
    </Link>
    <Link title="im@sparql" href="https://sparql.crssnky.xyz/imas/">
      <FaDatabase className="mr-2 text-2xl" />
      <span> by im@sparql</span>
    </Link>
  </div>
)

export default Links
