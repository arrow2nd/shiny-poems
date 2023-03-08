import InferNextProps from "infer-next-props-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import Home from "components/home";

import { generateOgpImageUrl } from "scripts/generate-ogp";

import { ServerSideProps } from "types/server-side-props";

export const getServerSideProps = ({
  query
}: GetServerSidePropsContext): GetServerSidePropsResult<ServerSideProps> => {
  const [ogpImageUrl, poemText] = generateOgpImageUrl(query);

  return {
    props: {
      ogpImageUrl,
      poemText
    }
  };
};

const ShinyPoems = (props: InferNextProps<typeof getServerSideProps>) => {
  return <Home {...props} />;
};

export default ShinyPoems;
