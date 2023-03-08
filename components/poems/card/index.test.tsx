import { render } from "@testing-library/react";

import { Poem } from "types/poem";

import Card from "./index";

describe("Card", () => {
  const samplePoems: Poem[] = [
    {
      id: "ShinySummer_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "シャイニーサマー",
      clothesName: "シャイニーサマー",
      text: "1stシーズンの水着。めぐるちゃんとお揃い柄♪"
    },
    {
      id: "DressUpParfum_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "ドレスアップパルファム",
      clothesName: "ドレスアップパルファム",
      text: "Cheers! 泡沫の間の輝き"
    },
    {
      id: "BaitwudeiRestaurant_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "バイトゥデイレストラント",
      clothesName: "バイトゥデイレストラント",
      text: "いらっしゃいませ、輝ける場所へ"
    },
    {
      id: "FashionableSummer_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "ファッショナブルサマー",
      clothesName: "ファッショナブルサマー",
      text: "サマーダイブ！とうめいな空と海で遊ぶ"
    },
    {
      id: "One_Day_Officer",
      idolName: "櫻木真乃",
      clothesTitle: "ワンデイシリーズ",
      clothesName: "ワンデイオフィサー",
      text: "勤務回想録。敬礼。みなさんの元へ急行しますっ"
    }
  ];

  test.each(samplePoems)("ポエムを正しく表示できるか", (poem) => {
    const { container } = render(<Card poem={poem} />);
    expect(container).toMatchSnapshot();
  });
});
