import { expect, test } from "../fixtures";
import { getWaveMask } from "./mask";

const poems = [
  // 句点で改行
  "ShinySummer_SakuragiMano",
  // 最初の句点で改行
  "One_Day_Officer",
  // "!"で改行
  "DressUpParfum_SakuragiMano",
  // "！"で改行
  "FashionableSummer_SakuragiMano",
  // 改行なし
  "BaitwudeiRestaurant_SakuragiMano"
];

for (const poem of poems) {
  test(`カードのレイアウトが変化していない (${poem}) @desktop`, async ({
    shinyPoems
  }) => {
    const { page } = shinyPoems;

    await page.goto(`/?id=${poem}`);

    await shinyPoems.page
      .getByTestId("poem-card-text")
      .first()
      .waitFor({ state: "visible" });

    await expect(page).toHaveScreenshot({
      fullPage: true,
      mask: getWaveMask(page)
    });
  });
}
