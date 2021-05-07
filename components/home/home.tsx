import Head from 'next/head'
import UI from '../ui/ui'
import Footer from './fotter'

type Props = {
  title: string
  subtitle: string
  desc: string
  url: string
}

const Home = (props: Props) => {
  const title = `${props.title} | ${props.subtitle}`
  const ogpImgUrl = `${props.url}/shiny-poems.png`

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={props.desc} />
        <meta property="og:url" content={props.url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={props.desc} />
        <meta property="og:image" content={ogpImgUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="arrow_2nd" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={props.desc} />
        <meta name="twitter:image" content={ogpImgUrl} />
      </Head>

      <header className="flex items-center justify-center w-full h-28 mb-2 bg-shiny">
        <div className="text-white text-center">
          <a href="/">
            <p className="text-4xl font-bold">{props.title}</p>
            <p className="text-sm mt-1">{props.subtitle}</p>
          </a>
        </div>
      </header>

      <main className="flex-grow mx-4">
        <UI />
      </main>

      <Footer />
    </div>
  )
}

export default Home
