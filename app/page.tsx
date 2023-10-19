import { Kiwi_Maru } from "next/font/google";
import { Metadata } from "next/types";

import Footer from "components/home/footer";
import Header from "components/home/header";
import UI from "components/ui";

import { generateOgpImageUrl, getPoem } from "libs/query";

import { SiteInfo } from "data/site";

const kiwiMaru = Kiwi_Maru({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-kiwimaru"
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
    <div
      className={`flex flex-col min-h-screen bg-neutral-white ${kiwiMaru.variable}`}
    >
      <Header />
      <UI poems={poem ? [poem] : []} />
      <Footer />
    </div>
  );
}
