import Link from 'components/common/link'
import Links from 'components/home/footer/links'

const Footer = () => (
  <footer className="flex flex-col items-center justify-center text-center w-full px-6 py-10 text-sm bg-shiny text-white">
    <Links />
    <span className="mb-1">
      {'All data is obtained from '}
      <Link text="imasp@rql" href="https://sparql.crssnky.xyz/imas/" />
    </span>
    <span className="mb-1">
      {'Logo icon made by '}
      <Link
        text="Pixel perfect"
        href="https://www.flaticon.com/authors/pixel-perfect"
      />
      {' from '}
      <Link text="flaticon" href="https://www.flaticon.com/" />
    </span>
    <span>
      The copyright of all content related to THE IDOLM@STER belongs to BANDAI
      NAMCO Entertainment Inc.
    </span>
  </footer>
)

export default Footer
