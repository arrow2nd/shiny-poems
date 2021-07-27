type Props = {
  href: string
  children: React.ReactNode
}

const LinkButton = ({ href, children }: Props) => (
  <span className="px-3 text-3xl">
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </span>
)

export default LinkButton
