import CLink, { LinkProps } from "components/common/link";

const Link = ({ className = "", children, title, href }: LinkProps) => (
  <div className={className}>
    <CLink
      className={`inline-flex flex-row items-center hover:text-black transition-colors`}
      title={title}
      href={href}
    >
      {children}
      <span>{`by ${title}`}</span>
    </CLink>
  </div>
);

export default Link;
