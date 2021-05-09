import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Home from '../components/home/home'
import { generateOgpImageUrl } from '../scripts/generate-ogp'

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
