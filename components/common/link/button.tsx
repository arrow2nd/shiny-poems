type Props = {
  title: string
  href: string
  children: React.ReactNode
}

const LinkButton = ({ title, href, children }: Props) => (
  <span className="px-3 text-3xl">
    <a title={title} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </span>
)

export default LinkButton
