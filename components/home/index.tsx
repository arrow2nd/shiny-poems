import SEO from 'components/common/seo'
import Footer from 'components/home/footer'
import Header from 'components/home/header'
import UI from 'components/ui'

import { ServerSideProps } from 'types/server-side-props'

const Home = ({ ogpImageUrl, poemText }: ServerSideProps) => (
  <div className="flex flex-col min-h-screen font-default">
    <SEO ogpImageUrl={ogpImageUrl} />
    <Header />
    <UI poemText={poemText} />
    <Footer />
  </div>
)

export default Home
