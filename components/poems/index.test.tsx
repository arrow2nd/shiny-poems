import { render } from "@testing-library/react";
import { Poem } from "types/poem";
import Poems from "./index";

describe("Poem", () => {
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

  test("ポエムが表示されている", () => {
    const { getByText } = render(<Poems items={samplePoems} />);

    expect(getByText("サマーダイブ！")).toBeDefined();
    expect(getByText("波がさらった五線譜のように")).toBeDefined();

    expect(getByText("スタッカート。")).toBeDefined();
    expect(getByText("まなうらにほら、赤橙黄緑霧藍紫")).toBeDefined();
  });

  test("該当ポエムがない場合の表示が正しい", () => {
    const { getByText } = render(<Poems items={[]} />);
    expect(getByText("ポエムが見つかりません…")).toBeDefined();
  });
});
