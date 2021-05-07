import Head from 'next/head'
import UI from '../ui/ui'
import Footer from './fotter'
import Header from './header'

const Home = () => {
  const title = 'ShinyPoems | シャニマス衣装ポエム検索'
  const desc = 'シャイニーカラーズの衣装ポエムが検索できるサイトです'

  const url = 'https://shiny-poems.vercel.app'
  const ogpImgUrl = `${url}/ogp-home.png`

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={ogpImgUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="arrow_2nd" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogpImgUrl} />
      </Head>

      <Header />
      <main className="flex-grow mx-4">
        <UI />
      </main>
      <Footer />
    </div>
  )
}

export default Home
