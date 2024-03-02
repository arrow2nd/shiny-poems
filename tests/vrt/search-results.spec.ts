import { expect, test } from "../fixtures";
import { getWaveMask } from "./mask";

test.beforeEach(async ({ shinyPoems: { page } }) => {
  await page.goto("/");
});

test("検索結果なし", async ({ shinyPoems }) => {
  const { page } = shinyPoems;

  await shinyPoems.page
    .getByTestId("poem-card-nothing")
    .waitFor({ state: "visible" });

  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: getWaveMask(page)
  });
});

test("検索結果がひとつ", async ({ shinyPoems }) => {
  const { page } = shinyPoems;
  await shinyPoems.searchByQuery("Shiny いくつもの可能性を繋ぎ照らす");

  await shinyPoems.page
    .getByTestId("poem-card-nothing")
    .waitFor({ state: "visible" });

  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: getWaveMask(page)
  });
});

test("検索結果が複数", async ({ shinyPoems }) => {
  const { page } = shinyPoems;
  await shinyPoems.searchByClothe("ほしあかり");

  await shinyPoems.page
    .getByTestId("poem-card-nothing")
    .waitFor({ state: "visible" });

  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: getWaveMask(page)
  });
});
