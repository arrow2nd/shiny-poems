import AccountLinks from './account-links'
import Link from '../common/link'

const Footer = () => (
  <footer className="flex flex-col items-center justify-center w-full h-80 md:h-64 px-5 text-sm bg-shiny text-white">
    <AccountLinks />
    <div className="mb-1">
      {'All data is obtained from '}
      <Link text="imasp@rql" href="https://sparql.crssnky.xyz/imas/" />
    </div>
    <p className="mb-1">
      {'Logo icon made by '}
      <Link
        text="Pixel perfect"
        href="https://www.flaticon.com/authors/pixel-perfect"
      />
      {' from '}
      <Link text="flaticon" href="https://www.flaticon.com/" />
    </p>
    <p>
      {
        'The copyright of all content related to THE IDOLM@STER belongs to BANDAI NAMCO Entertainment Inc.'
      }
    </p>
  </footer>
)

export default Footer
