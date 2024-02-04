import Image from "next/image";
import LogoImg from "public/logo.png";
import GitHubCorner from "./github-corner";

const Header = () => (
  <header className="flex w-full items-center justify-center py-20">
    <a className="w-64 text-none md:w-80" href="/" data-testid="logo">
      <Image
        src={LogoImg}
        alt="logo"
        width={618}
        height={140}
        placeholder="empty"
        priority
      />
    </a>
    <GitHubCorner
      href="https://github.com/arrow2nd/shiny-poems"
      bannerColor="#4C7ABE"
      octoColor="#fff"
      size={80}
    />
  </header>
);

export default Header;
