import SEO from 'components/common/seo'
import UI from 'components/ui'

import { ServerSideProps } from 'types/server-side-props'

import Footer from './footer'
import Header from './header'

const Home = ({ ogpImageUrl, poemText }: ServerSideProps) => (
  <div className="flex flex-col min-h-screen font-default">
    <SEO ogpImageUrl={ogpImageUrl} />
    <Header />
    <UI poemText={poemText} />
    <Footer />
  </div>
)

export default Home
