import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { generateOgpImageUrl } from '../scripts/generate-ogp'
import { ServerSideProps } from '../types/server-side-props'
import Home from '../components/home'

const ShinyPoems = (props: ServerSideProps) => <Home {...props} />

export const getServerSideProps = ({
  query
}: GetServerSidePropsContext): GetServerSidePropsResult<ServerSideProps> => {
  const [ogpImageUrl, poemText] = generateOgpImageUrl(query)

  return {
    props: {
      ogpImageUrl,
      poemText
    }
  }
}

export default ShinyPoems
