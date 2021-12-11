import { FaGithubAlt, FaTwitter } from 'react-icons/fa'

import Link from 'components/common/link'

const LinkIcons = () => (
  <div className="flex flex-row mb-4 text-2xl text-white">
    <Link className="mr-4" title="Twitter" href="https://twitter.com/arrow_2nd">
      <FaTwitter />
    </Link>
    <Link title="GitHub" href="https://github.com/arrow2nd/shiny-poems">
      <FaGithubAlt />
    </Link>
  </div>
)

export default LinkIcons
