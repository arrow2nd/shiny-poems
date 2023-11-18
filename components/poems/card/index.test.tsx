import { render } from "@testing-library/react";

import { Poem } from "types/poem";

import Card from "./index";

const testCases: { title: string; poem: Poem }[] = [
  {
    title: "改行されるパターン (句点)",
    poem: {
      id: "ShinySummer_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "シャイニーサマー",
      clothesName: "シャイニーサマー",
      text: "1stシーズンの水着。めぐるちゃんとお揃い柄♪"
    }
  },
  {
    title: "1つ目の句点で改行されるパターン",
    poem: {
      id: "One_Day_Officer",
      idolName: "櫻木真乃",
      clothesTitle: "ワンデイシリーズ",
      clothesName: "ワンデイオフィサー",
      text: "勤務回想録。敬礼。みなさんの元へ急行しますっ"
    }
  },
  {
    title: "改行されるパターン (スペース)",
    poem: {
      id: "DressUpParfum_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "ドレスアップパルファム",
      clothesName: "ドレスアップパルファム",
      text: "Cheers! 泡沫の間の輝き"
    }
  },
  {
    title: "改行されないパターン (読点)",
    poem: {
      id: "BaitwudeiRestaurant_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "バイトゥデイレストラント",
      clothesName: "バイトゥデイレストラント",
      text: "いらっしゃいませ、輝ける場所へ"
    }
  },
  {
    title: "改行されないパターン (スペースなし)",
    poem: {
      id: "FashionableSummer_SakuragiMano",
      idolName: "櫻木真乃",
      clothesTitle: "ファッショナブルサマー",
      clothesName: "ファッショナブルサマー",
      text: "サマーダイブ！とうめいな空と海で遊ぶ"
    }
  }
];

test.each(testCases)("$title", ({ poem }) => {
  const { container } = render(<Card poem={poem} />);
  expect(container).toMatchSnapshot();
});

