import { HTMLProps } from "react";

import CommonLink from "components/common/link";

const Link = ({
  className = "",
  children,
  title,
  href
}: HTMLProps<HTMLAnchorElement>) => (
  <div className={className}>
    <CommonLink
      className={`inline-flex flex-row items-center hover:text-black transition-colors`}
      title={title}
      href={href}
    >
      {children}
      <span>{`by ${title}`}</span>
    </CommonLink>
  </div>
);

export default Link;
