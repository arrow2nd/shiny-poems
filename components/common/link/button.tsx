type Props = {
  className?: string
  title: string
  href: string
  children: React.ReactNode
}

const LinkButton = ({ className = '', title, href, children }: Props) => (
  <span className={className}>
    <a title={title} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </span>
)

export default LinkButton
