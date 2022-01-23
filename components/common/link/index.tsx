type Props = {
  className?: string
  children?: React.ReactNode
  title: string
  href: string
}

const Link = (props: Props) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {props.children || props.title}
  </a>
)

export default Link
