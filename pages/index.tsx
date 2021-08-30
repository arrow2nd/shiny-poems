import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { generateOgpImageUrl } from '../scripts/generate-ogp'
import Home from '../components/home'

type Props = {
  ogpImageUrl: string
}

const ShinyPoems = (props: Props) => <Home {...props} />

export const getServerSideProps = ({
  query
}: GetServerSidePropsContext): GetServerSidePropsResult<Props> => {
  const url = generateOgpImageUrl(query)

  return {
    props: {
      ogpImageUrl: url
    }
  }
}

export default ShinyPoems
