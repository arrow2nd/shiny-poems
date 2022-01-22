import Copyright from './copyright'
import Links from './links'

const Footer = () => (
  <footer className="flex flex-col items-center justify-center text-center w-full px-6 py-10 text-sm bg-shiny text-white">
    <Links />
    <Copyright />
  </footer>
)

export default Footer
