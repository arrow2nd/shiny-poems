import Links from './links'

const Footer = () => (
  <footer className="flex flex-col items-center justify-center text-center w-full px-8 py-20 tracking-wider bg-main">
    <Links />
    <span className="w-8 h-0.5 mb-8 bg-white rounded-full" />
    <span className="text-white text-sm">
      The rights to all content related to THE IDOLM@STER belong to BANDAI NAMCO
      Entertainment Inc.
    </span>
  </footer>
)

export default Footer
