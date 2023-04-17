import { expect, test } from "@playwright/test";

import { baseUrl } from "./utils";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test("ポエムの一部から検索", async ({ page }) => {
  // 検索ボックスに入力
  const textbox = page.getByTestId("poem-search-textbox");
  await textbox.focus();
  await textbox.fill("すまじきものは恋");

  // 検索実行
  await page.getByTestId("poem-search-submit").click();

  // 検索結果が表示されているか
  const poemText = page.locator('[data-testid="poem-card-text"] > p');
  await expect(poemText).toHaveText(["ルームウェア。", "すまじきものは恋"]);

  // 検索結果がひとつの場合の画面をチェック
  await expect(page).toHaveScreenshot("search-result-single.png");
});

test("アイドル名から検索", async ({ page }) => {
  // 検索ボックスに入力
  const inputBox = page.locator('[id="react-select-アイドル名から-input"]');
  await inputBox.focus();
  await inputBox.fill("芹沢あさひ");

  // 検索実行
  await inputBox.press("Enter");

  // あさひの衣装が表示されているか
  const poemCardIdol = page.getByTestId("poem-card-idol").first();
  await expect(poemCardIdol).toHaveText("芹沢あさひ");
});

test("衣装名から検索", async ({ page }) => {
  // 検索ボックスに入力
  const inputBox = page.locator('[id="react-select-衣装名から-input"]');
  await inputBox.focus();
  await inputBox.fill("ほしあかり");

  // 検索実行
  await inputBox.press("Enter");

  // 衣装「ほしあかり」が表示されているか
  const poemCardIdol = page.getByTestId("poem-card-clothe").first();
  await expect(poemCardIdol).toHaveText("ほしあかり");

  // 検索結果が複数の場合の画面をチェック
  await expect(page).toHaveScreenshot("search-result-multi.png");
});

test("ロゴクリックでリセット", async ({ page }) => {
  // 検索実行
  const textbox = page.getByTestId("poem-search-textbox");
  await textbox.focus();
  await textbox.fill("にーちゅ");
  await page.getByTestId("poem-search-submit").click();

  // ロゴをクリック
  await page.getByTestId("logo").click();

  // ポエムがない場合の表示になっているか
  const poemCardNothing = page.getByTestId("poem-card-nothing");
  await expect(poemCardNothing).toHaveText("ポエムが見つかりません…");
});
