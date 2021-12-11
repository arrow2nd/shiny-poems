import Link from 'components/common/link'
import LinkIcons from 'components/home/footer/link-icons'

const Footer = () => {
  const linkStyle = 'underline text-white hover:text-mano transition-colors'

  return (
    <footer className="flex flex-col items-center justify-center text-center w-full px-6 py-10 text-sm bg-shiny text-white">
      <LinkIcons />
      <span className="mb-1">
        {'All data is obtained from '}
        <Link
          className={linkStyle}
          title="imasp@rql"
          href="https://sparql.crssnky.xyz/imas/"
        />
      </span>
      <span className="mb-1">
        {'Logo icon made by '}
        <Link
          className={linkStyle}
          title="Pixel perfect"
          href="https://www.flaticon.com/authors/pixel-perfect"
        />
        {' from '}
        <Link
          className={linkStyle}
          title="flaticon"
          href="https://www.flaticon.com/"
        />
      </span>
      <span>
        The copyright of all content related to THE IDOLM@STER belongs to BANDAI
        NAMCO Entertainment Inc.
      </span>
    </footer>
  )
}

export default Footer
