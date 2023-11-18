import { expect, test } from "@playwright/test";

test("クエリパラメータで指定したポエムが表示される", async ({ page }) => {
  await page.goto("/?id=CelestialColors_YukokuKiriko");

  const idolName = page.getByTestId("poem-card-idol").first();
  await expect(idolName, "アイドル名が正しい").toHaveText("幽谷霧子");

  const clotheName = page.getByTestId("poem-card-clothe").first();
  await expect(clotheName, "衣装名が正しい").toHaveText(
    "セレスティアルカラーズ"
  );
});
