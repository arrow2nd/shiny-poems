import { Metadata } from "next/types";
import Footer from "components/common/footer";
import Header from "components/common/header";
import UI from "components/ui";
import { searchPoems } from "libs/search";
import { getPoem } from "libs/utils";
import { SiteInfo } from "data/site";
import { Query } from "types/query";
import { kiwiMaru } from "./font";

type Props = {
  searchParams: Promise<{ id?: string } & Query>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id, q } = await props.searchParams;
  const imageUrl = id ? `/${id}/opengraph-image` : "/og-image-default.png";

  const { name, title, description, url } = SiteInfo;
  const siteTitle = q ? `「${q}」の検索結果 | ${name}` : title;

  return {
    title: siteTitle,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title: siteTitle,
      description,
      url,
      siteName: name,
      type: "website",
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images: [{ url: imageUrl }]
    }
  };
}

export default async function Page(props: Props) {
  const { id, ...query } = await props.searchParams;

  const poems = id ? getPoem(id) : await searchPoems(query);

  return (
    <main className={kiwiMaru.variable}>
      <Header />
      <UI poems={poems} query={query} />
      <Footer />
    </main>
  );
}
