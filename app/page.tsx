import { Metadata } from "next/types";

import Footer from "components/home/footer";
import Header from "components/home/header";
import UI from "components/ui";

import { Query, generateOgpImageUrl, getPoem } from "scripts/query";

import { SiteInfo } from "data/site";

export async function generateMetadata({
  searchParams
}: {
  searchParams: Query;
}): Promise<Metadata> {
  const imageUrl = generateOgpImageUrl(searchParams);
  const { title, description, url } = SiteInfo;

  return {
    title,
    description,
    openGraph: {
      title: title,
      description,
      url: url,
      siteName: title,
      type: "website",
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [{ url: imageUrl }]
    }
  };
}

export default function Page({ searchParams }: { searchParams: Query }) {
  const poem = getPoem(searchParams);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-white font-default">
      <Header />
      <UI poemText={poem?.text ?? ""} />
      <Footer />
    </div>
  );
}
