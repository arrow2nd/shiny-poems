type Props = {
  text: string
  href: string
}

const Link = ({ text, href }: Props) => (
  <a
    className="underline text-white hover:text-mano transition-colors"
    title={text}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {text}
  </a>
)

export default Link
