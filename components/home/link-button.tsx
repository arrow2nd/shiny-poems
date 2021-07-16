type Props = {
  href: string
  children: React.ReactNode
}

const LinkButton = ({ href, children }: Props) => (
  <span className="mx-2 text-4xl hover:text-gray-500 transition-colors">
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </span>
)

export default LinkButton
