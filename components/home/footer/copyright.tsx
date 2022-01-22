import Link from 'components/common/link'

const Copyright = () => {
  const linkStyle = 'underline text-white hover:text-luca transition-colors'

  return (
    <>
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
    </>
  )
}

export default Copyright
