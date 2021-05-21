type Props = {
  href: string
  children: React.ReactNode
}

const LinkButton = ({ href, children }: Props) => (
  <span className="mx-2 text-4xl">
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  </span>
)

export default LinkButton
