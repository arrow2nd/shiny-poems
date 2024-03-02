import { Poem } from "types/poem";
import { expect, test } from "../fixtures";
import { getWaveMask } from "./mask";

const poems: Poem[] = [
  // 句点で改行
  {
    id: "ShinySummer_SakuragiMano",
    idolName: "櫻木真乃",
    clothesTitle: "シャイニーサマー",
    clothesName: "シャイニーサマー",
    text: "1stシーズンの水着。めぐるちゃんとお揃い柄♪"
  },
  // 最初の句点で改行
  {
    id: "One_Day_Officer",
    idolName: "櫻木真乃",
    clothesTitle: "ワンデイシリーズ",
    clothesName: "ワンデイオフィサー",
    text: "勤務回想録。敬礼。みなさんの元へ急行しますっ"
  },
  // "!"で改行
  {
    id: "DressUpParfum_SakuragiMano",
    idolName: "櫻木真乃",
    clothesTitle: "ドレスアップパルファム",
    clothesName: "ドレスアップパルファム",
    text: "Cheers! 泡沫の間の輝き"
  },
  // "！"で改行
  {
    id: "FashionableSummer_SakuragiMano",
    idolName: "櫻木真乃",
    clothesTitle: "ファッショナブルサマー",
    clothesName: "ファッショナブルサマー",
    text: "サマーダイブ！とうめいな空と海で遊ぶ"
  },
  // 改行なし
  {
    id: "BaitwudeiRestaurant_SakuragiMano",
    idolName: "櫻木真乃",
    clothesTitle: "バイトゥデイレストラント",
    clothesName: "バイトゥデイレストラント",
    text: "いらっしゃいませ、輝ける場所へ"
  }
];

test("カードのレイアウトが変化していない @desktop", async ({ shinyPoems }) => {
  const { page } = shinyPoems;

  // 検索結果を上書き
  await page.route("/", async (route, req) => {
    if (req.method() !== "POST") {
      return route.continue();
    }

    const response = await route.fetch();
    const body = `0:["$@1",["development",null]]
1:{"poems":${JSON.stringify(poems)}}
`;

    return route.fulfill({ response, body });
  });

  await page.goto("/");
  await shinyPoems.searchByQuery("test");

  await shinyPoems.page
    .getByTestId("poem-card-text")
    .first()
    .waitFor({ state: "visible" });

  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: getWaveMask(page)
  });
});
