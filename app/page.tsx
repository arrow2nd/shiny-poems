import { Metadata } from "next/types";
import Footer from "components/common/footer";
import Header from "components/common/header";
import UI from "components/ui";
import { getPoem } from "libs/utils";
import { clothes } from "data/clothes";
import { SiteInfo } from "data/site";
import { units } from "data/units";
import { kiwiMaru } from "./font";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const imageUrl = searchParams?.id
    ? `/${searchParams.id}/opengraph-image`
    : "/og-image-default.png";

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

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const poem = getPoem(searchParams.id);

  return (
    <main className={kiwiMaru.variable}>
      <Header />
      <UI selectOptions={{ units, clothes }} poems={poem ? [poem] : []} />
      <Footer />
    </main>
  );
}
