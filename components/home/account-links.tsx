import { FaGithubAlt, FaTwitter } from 'react-icons/fa'
import LinkButton from '../common/link/button'

const AccountLinks = () => (
  <div className="flex flex-row mb-6">
    <LinkButton title="Twitter" href="https://twitter.com/arrow_2nd">
      <FaTwitter />
    </LinkButton>
    <LinkButton title="GitHub" href="https://github.com/arrow2nd/shiny-poems">
      <FaGithubAlt />
    </LinkButton>
  </div>
)

export default AccountLinks
