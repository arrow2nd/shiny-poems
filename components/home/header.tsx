import Image from 'next/image'

const Header = () => (
  <header className="flex items-center justify-center w-full h-28 mb-12 md:mb-16 bg-shiny">
    <a className="text-none" href="">
      <Image src="/logo.svg" alt="logo" width={250} height={56} />
    </a>
  </header>
)

export default Header
