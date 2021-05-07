import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'
import LinkButton from './link-button'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-48 mt-10 p-3 bg-shiny text-white text-center">
      <div className="flex flex-row">
        <LinkButton href="https://twitter.com/arrow_2nd">
          <AiFillTwitterCircle />
        </LinkButton>
        <LinkButton href="https://github.com/arrow2nd/shiny-poems">
          <AiFillGithub />
        </LinkButton>
      </div>
      <div className="mt-3">
        <div>
          {'Favicon made by '}
          <a
            title="Pixel perfect"
            className="font-semibold"
            href="https://www.flaticon.com/authors/pixel-perfect"
            target="_blank"
            rel="noopener"
          >
            Pixel perfect
          </a>
          {' from '}
          <a
            title="Flaticon"
            className="font-semibold"
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener"
          >
            www.flaticon.com
          </a>
        </div>
        <p>
          The copyright of the contents related to THE IDOLM@STER belongs to
          BANDAI NAMCO Entertainment Inc.
        </p>
      </div>
    </footer>
  )
}

export default Footer
