import Copyright from './copyright'
import GitHubLink from './github-link'

const Footer = () => (
  <footer className="flex flex-col items-center justify-center text-center w-full px-6 py-10 text-sm bg-shiny text-white">
    <GitHubLink />
    <span className="w-16 h-0.5 mb-4 bg-white rounded-full" />
    <Copyright />
  </footer>
)

export default Footer
