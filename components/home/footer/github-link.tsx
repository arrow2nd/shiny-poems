import { FaCode } from 'react-icons/fa'

import Link from 'components/common/link'

const GitHubLink = () => (
  <div className="flex flex-row mb-4 items-center">
    <Link
      className="mr-2 text-2xl text-white hover:text-luca transition-colors"
      title="GitHub"
      href="https://github.com/arrow2nd/shiny-poems"
    >
      <FaCode />
    </Link>
    <span>by arrow2nd</span>
  </div>
)

export default GitHubLink
