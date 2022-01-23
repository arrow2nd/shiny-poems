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
      <span>
        The rights to all content related to THE IDOLM@STER belong to
        BANDAI NAMCO Entertainment Inc.
      </span>
    </>
  )
}

export default Copyright
