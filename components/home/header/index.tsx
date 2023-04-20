import Image from "next/image";
import LogoImg from "public/logo.png";
import GithubCorner from "react-github-corner";

const Header = () => (
  <header className="flex justify-center items-center py-20 w-full">
    <a className="w-64 md:w-80 text-none" href="" data-testid="logo">
      <Image
        src={LogoImg}
        alt="logo"
        width={618}
        height={140}
        placeholder="blur"
      />
    </a>
    {/*
    <GithubCorner
      href="https://github.com/arrow2nd/shiny-poems"
      bannerColor="#4C7ABE"
      octoColor="#fff"
      size={80}
      direction="right"
    />
    */}
  </header>
);

export default Header;
