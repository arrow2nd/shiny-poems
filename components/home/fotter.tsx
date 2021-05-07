import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'
import LinkButton from './link-button'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-56 mt-10 p-3 bg-shiny text-white text-center">
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
          {'Logo icon made by '}
          <a
            className="font-semibold"
            title="Pixel perfect"
            href="https://www.flaticon.com/authors/pixel-perfect"
            target="_blank"
            rel="noopener"
          >
            Pixel perfect
          </a>
          {' from '}
          <a
            className="font-semibold"
            title="Flaticon"
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener"
          >
            www.flaticon.com
          </a>
        </div>
        <div className="mt-2">
          <p>
            The copyright of all content related to THE iDOLM@STER belongs to
            BANDAI NAMCO Entertainment Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
