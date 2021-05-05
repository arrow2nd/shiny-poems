type LinkButtonProps = {
  href: string
  icon: string
}

const LinkButton = (props: LinkButtonProps) => (
  <span className="text-3xl m-2">
    <a href={props.href} target="_blank" rel="noopener">
      <i className={props.icon} />
    </a>
  </span>
)

export default LinkButton
