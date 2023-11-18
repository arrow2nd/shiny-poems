import { HTMLProps } from "react";

const Link = (props: HTMLProps<HTMLAnchorElement>) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {props.children || props.title}
  </a>
);

export default Link;
