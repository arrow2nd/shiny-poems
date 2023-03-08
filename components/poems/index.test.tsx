import { render } from "@testing-library/react";

import { Poem } from "types/poem";

import Poems from "./index";

describe("Poems", () => {
  const samplePoems: Poem[] = [
    {
      id: "FashionableSummer_YukokuKiriko",
      idolName: "幽谷霧子",
      clothesTitle: "ファッショナブルサマー",
      clothesName: "ファッショナブルサマー",
      text: "サマーダイブ！波がさらった五線譜のように"
    },
    {
      id: "SunsetSkyPassage_YukokuKiriko",
      idolName: "幽谷霧子",
      clothesTitle: "サンセットスカイパッセージ",
      clothesName: "サンセットスカイパッセージ",
      text: "スタッカート。まなうらにほら、赤橙黄緑霧藍紫"
    }
  ];

  test("ポエムの一覧表示が正しいか", () => {
    const { container } = render(<Poems items={samplePoems} />);
    expect(container).toMatchSnapshot();
  });

  test("該当ポエムがない場合の表示が正しいか", () => {
    const { container } = render(<Poems items={[]} />);
    expect(container).toMatchSnapshot();
  });
});
