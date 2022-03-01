import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from 'next'

import Home from 'components/home'

import { generateOgpImageUrl } from 'scripts/generate-ogp'

import { ServerSideProps } from 'types/server-side-props'

const ShinyPoems = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Home {...props} />

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
