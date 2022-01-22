import Image from 'next/image'
import LogoImg from 'public/logo.png'

const Header = () => (
  <header className="flex justify-center items-center w-full h-24 mb-12 md:mb-16 bg-shiny">
    <a className="text-none" href="">
      <Image
        src={LogoImg}
        alt="logo"
        width={256}
        height={58}
        placeholder="blur"
      />
    </a>
  </header>
)

export default Header
