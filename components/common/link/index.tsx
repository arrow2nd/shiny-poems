export type LinkProps = {
  className?: string
  children?: React.ReactNode
  title: string
  href: string
}

const Link = (props: LinkProps) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {props.children || props.title}
  </a>
)

export default Link
