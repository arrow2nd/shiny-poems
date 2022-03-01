import CLink from 'components/common/link'

type Props = {
  className?: string
  title: string
  text: string
  href: string
  children: React.ReactNode
}

const Link = ({ className = '', title, text, href, children }: Props) => (
  <div className={className}>
    <CLink
      className="inline-flex flex-row items-center hover:text-black transition-colors"
      title={title}
      href={href}
    >
      {children}
      <span>{text}</span>
    </CLink>
  </div>
)

export default Link
