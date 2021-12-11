import Image from 'next/image'

const Header = () => (
  <header className="flex justify-center items-center w-full h-20 mb-16 bg-shiny">
    <div>
      <a className="text-none" href="">
        <Image src="/logo.svg" alt="logo" width={210} height={47} />
      </a>
    </div>
  </header>
)

export default Header
