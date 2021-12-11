import Image from 'next/image'

const Header = () => (
  <header className="flex justify-center items-center w-full h-24 mb-16 bg-shiny">
    <a className="text-none" href="">
      <Image src="/logo.svg" alt="logo" width={210} height={47} />
    </a>
  </header>
)

export default Header
