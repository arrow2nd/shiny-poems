type Props = {
  href: string
  icon: string
}

const LinkButton = (props: Props) => (
  <span className="text-3xl m-2">
    <a href={props.href} target="_blank" rel="noopener">
      <i className={props.icon} />
    </a>
  </span>
)

export default LinkButton
