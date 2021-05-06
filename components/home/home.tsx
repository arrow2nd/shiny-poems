import Head from 'next/head'

import UI from '../ui/ui'
import LinkButton from './link-button'

type Props = {
  title: string
  subtitle: string
  desc: string
  url: string
  ogpImg: string
}

const Home = (props: Props) => {
  const title = `${props.title} | ${props.subtitle}`

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta />
        <meta name="description" content={props.desc} />
        <meta name="image" content="" />
        <meta property="og:url" content={props.url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={props.desc} />
        <meta property="og:image" content={props.ogpImg} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="arrow_2nd" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={props.desc} />
        <meta name="twitter:image" content={props.ogpImg} />
        <link
          rel="stylesheet"
          href="http://olicons.yemaosheji.com/css/olicons.css"
        />
      </Head>
      <header className="flex items-center justify-center w-full h-28 mb-2 bg-shiny">
        <div className="text-white text-center">
          <p className="text-4xl font-bold">{props.title}</p>
          <p className="text-sm mt-1">{props.subtitle}</p>
        </div>
      </header>
      <main className="flex-grow mx-4">
        <UI />
      </main>
      <footer className="flex flex-col items-center justify-center w-full h-48 mt-10 p-3 bg-shiny text-white text-center">
        <div>
          <LinkButton
            href="https://twitter.com/arrow_2nd"
            icon="ol-twitter-f"
          />
          <LinkButton
            href="https://github.com/arrow2nd/shiny-poems"
            icon="ol-github-f"
          />
        </div>
        <div className="mt-3">
          <p>
            The copyright of the contents related to THE IDOLM@STER belongs to
            BANDAI NAMCO Entertainment Inc.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
