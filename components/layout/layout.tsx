import Head from 'next/head'
import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const Layout = (props: LayoutProps) => (
  <div>
    <Head>
      <title>ShinyPoems | シャニマス衣装ポエム検索</title>
      <link
        rel="stylesheet"
        href="http://olicons.yemaosheji.com/css/olicons.css"
      />
    </Head>

    <header className="flex items-center justify-center w-full h-24 mb-2 bg-shiny">
      <div className="text-white text-center">
        <p className="text-4xl font-bold">ShinyPoems</p>
        <p className="text-sm mt-1">シャニマス衣装ポエム検索</p>
      </div>
    </header>

    <main className="mx-4">{props.children}</main>

    <footer className="flex items-center justify-center w-full h-24 mt-10 bg-shiny">
      <div className="text-white text-center">
        <p>
          The copyright of the contents related to THE IDOLM@STER belongs to
          BANDAI NAMCO Entertainment Inc.
        </p>
      </div>
    </footer>
  </div>
)

export default Layout
