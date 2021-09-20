import { ServerSideProps } from '../../types/server-side-props'
import SEO from '../common/seo'
import UI from '../ui'
import Footer from './fotter'
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
