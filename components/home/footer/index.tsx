import Wave from 'react-wavify'

import Links from './links'

const Footer = () => (
  <footer className="w-full">
    <Wave
      className="relative h-24 top-0.5 align-bottom"
      fill="#4C7ABE"
      paused={false}
      options={{
        height: 8,
        amplitude: 20,
        speed: 0.155
      }}
    />
    <div className="flex flex-col items-center justify-center text-center px-8 pb-20 tracking-wider bg-main">
      <Links />
      <span className="w-8 mb-8 border border-dashed border-white" />
      <span className="text-white text-sm">
        The rights to all content related to THE IDOLM@STER belong to BANDAI
        NAMCO Entertainment Inc.
      </span>
    </div>
  </footer>
)

export default Footer
