import { FiDatabase } from 'react-icons/fi'
import { HiCode } from 'react-icons/hi'

import Link from './link'

const Links = () => (
  <div className="mb-8 text-sm text-white">
    <Link
      className="mb-2"
      title="Twitter"
      text="by arrow2nd"
      href="https://twitter.com/arrow_2nd"
    >
      <HiCode className="mr-2 text-2xl" />
    </Link>

    <Link
      title="im@sparql"
      href="https://sparql.crssnky.xyz/imas"
      text="by im@sparql"
    >
      <FiDatabase className="mr-2 text-2xl" />
    </Link>
  </div>
)

export default Links
