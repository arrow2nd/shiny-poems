import CLink from 'components/common/link'

type Props = {
  className?: string
  title: string
  href: string
  children: React.ReactNode
}

const Link = ({ className = '', title, href, children }: Props) => (
  <div className={className}>
    <CLink
      className="inline-flex flex-row items-center hover:text-luca transition-colors"
      title={title}
      href={href}
    >
      {children}
    </CLink>
  </div>
)

export default Link
