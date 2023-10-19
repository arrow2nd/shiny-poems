import { Metadata } from "next/types";

import Footer from "components/common/footer";
import Header from "components/common/header";
import UI from "components/ui";

import { generateOgpImageUrl, getPoem } from "libs/query";

import { SiteInfo } from "data/site";

import { kiwiMaru } from "./font";

type Props = {
  searchParams: {
    id?: string;
  };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  const imageUrl = generateOgpImageUrl(searchParams.id);
  const { title, description, url } = SiteInfo;

  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      type: "website",
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl }]
    }
  };
}

export default function Page({ searchParams }: Props) {
  const poem = getPoem(searchParams.id);

  return (
    <main className={kiwiMaru.variable}>
      <Header />
      <UI poems={poem ? [poem] : []} />
      <Footer />
    </main>
  );
}
