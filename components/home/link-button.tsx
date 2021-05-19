type Props = {
  href: string
  children: React.ReactNode
}

const LinkButton = (props: Props) => (
  <span className="mx-2 text-4xl">
    <a href={props.href} target="_blank" rel="noopener">
      {props.children}
    </a>
  </span>
)

export default LinkButton
