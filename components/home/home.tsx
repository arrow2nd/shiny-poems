import Head from 'next/head'

import UI from './ui'
import LinkButton from '../common/link-button'

const Home = () => (
  <div className="flex flex-col min-h-screen">
    <Head>
      <title>ShinyPoems | シャニマス衣装ポエム検索</title>
      <link
        rel="stylesheet"
        href="http://olicons.yemaosheji.com/css/olicons.css"
      />
    </Head>
    <header className="flex items-center justify-center w-full h-28 mb-2 bg-shiny">
      <div className="text-white text-center">
        <p className="text-4xl font-bold">ShinyPoems</p>
        <p className="text-sm mt-1">シャニマス衣装ポエム検索</p>
      </div>
    </header>
    <main className="flex-grow mx-4">
      <UI />
    </main>
    <footer className="flex flex-col items-center justify-center w-full h-48 mt-10 p-3 bg-shiny text-white text-center">
      <div>
        <LinkButton href="https://twitter.com/arrow_2nd" icon="ol-twitter-f" />
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

export default Home
