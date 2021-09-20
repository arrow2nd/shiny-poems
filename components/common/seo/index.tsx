import Head from 'next/head'

type Props = {
  ogpImageUrl: string
}

const SEO = ({ ogpImageUrl }: Props) => {
  const title = 'ShinyPoems | シャニマス衣装ポエム検索'
  const desc = 'シャイニーカラーズの衣装ポエムが検索できるサイトです'
  const url = 'https://shiny-poems.vercel.app'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogpImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@arrow_2nd" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogpImageUrl} />
    </Head>
  )
}

export default SEO
