import { FaGithubAlt, FaTwitter } from 'react-icons/fa'

import LinkButton from 'components/common/link/button'

const Links = () => (
  <div className="flex flex-row mb-4 text-3xl text-white">
    <LinkButton
      className="mr-4"
      title="Twitter"
      href="https://twitter.com/arrow_2nd"
    >
      <FaTwitter />
    </LinkButton>
    <LinkButton title="GitHub" href="https://github.com/arrow2nd/shiny-poems">
      <FaGithubAlt />
    </LinkButton>
  </div>
)

export default Links
