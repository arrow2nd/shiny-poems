import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'

import Home from 'components/home'

import { generateOgpImageUrl } from 'scripts/generate-ogp'

import { ServerSideProps } from 'types/server-side-props'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ShinyPoems = (props: Props) => <Home {...props} />

export default ShinyPoems

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
