import { kiwiMaru } from "app/font";

import Footer from "components/common/footer";
import Header from "components/common/header";
import UI from "components/ui";

import { SearchParams, searchPoems } from "libs/poems";

type Props = {
  searchParams: SearchParams;
};

export default function Page({ searchParams }: Props) {
  const poems = searchPoems(searchParams);

  return (
    <main className={kiwiMaru.variable}>
      <Header />
      <UI poems={poems} searchParams={searchParams} />
      <Footer />
    </main>
  );
}
