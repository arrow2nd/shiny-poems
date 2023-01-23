import Head from 'next/head'

import { Site } from 'data/site'

type Props = {
  ogpImageUrl: string
}

const SEO = ({ ogpImageUrl }: Props) => {
  const { title, desc, url } = Site

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogpImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogpImageUrl} />
    </Head>
  )
}

export default SEO
