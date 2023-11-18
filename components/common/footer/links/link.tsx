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
      className={`inline-flex flex-row items-center transition-colors hover:text-black`}
      title={title}
      href={href}
    >
      {children}
      <span>{`by ${title}`}</span>
    </CommonLink>
  </div>
);

export default Link;
