type Props = {
  href: string
  children: React.ReactNode
}

const LinkButton = (props: Props) => (
  <span className="text-3xl m-2">
    <a href={props.href} target="_blank" rel="noopener">
      {props.children}
    </a>
  </span>
)

export default LinkButton
