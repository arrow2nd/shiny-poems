import { expect, test } from "@playwright/test";

import { baseUrl } from "../utils";

// ファイル内のテストを並列に実行
test.describe.configure({ mode: "parallel" });

test("クエリパラメータで指定したポエムが表示されるか", async ({ page }) => {
  await page.goto(`${baseUrl}/?id=CelestialColors_YukokuKiriko`);

  // アイドル名は幽谷霧子か
  const idolName = page.getByTestId("poem-card-idol").first();
  await expect(idolName).toHaveText("幽谷霧子");

  // 衣装名はセレスティアルカラーズか
  const clotheName = page.getByTestId("poem-card-clothe").first();
  await expect(clotheName).toHaveText("セレスティアルカラーズ");
});
