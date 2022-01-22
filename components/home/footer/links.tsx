import { FaGithubAlt, FaTwitter } from 'react-icons/fa'

import Link from 'components/common/link'

const Links = () => {
  const linkStyle = 'text-white hover:text-luca transition-colors'

  return (
    <div className="flex flex-row mb-4 text-2xl">
      <Link
        className={'mr-4 ' + linkStyle}
        title="Twitter"
        href="https://twitter.com/arrow_2nd"
      >
        <FaTwitter />
      </Link>
      <Link
        className={linkStyle}
        title="GitHub"
        href="https://github.com/arrow2nd/shiny-poems"
      >
        <FaGithubAlt />
      </Link>
    </div>
  )
}

export default Links
