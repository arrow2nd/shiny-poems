import CommonLink, { LinkProps } from "components/common/link";

const Link = ({ className = "", children, title, href }: LinkProps) => (
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
