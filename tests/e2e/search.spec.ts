import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("ポエムの一部から検索", async ({ page }) => {
  // 検索ボックスに入力
  const textbox = page.getByTestId("poem-textbox");
  await textbox.fill("すまじきものは恋");

  // 検索実行
  const submitButton = page.getByTestId("poem-submit-button");
  await submitButton.click();

  const poemText = page.getByTestId("poem-card-text").getByRole("paragraph");
  await expect(poemText, "一致するポエムが表示されている").toHaveText([
    "ルームウェア。",
    "すまじきものは恋"
  ]);
});

test("アイドル名から検索", async ({ page }) => {
  const combobox = page.getByTestId("idol-combobox");
  await combobox.selectOption("櫻木真乃");

  const poemCardIdol = page.getByTestId("poem-card-idol").first();
  await expect(
    poemCardIdol,
    "表示されているポエムのアイドル名が正しい"
  ).toHaveText("櫻木真乃");
});

test("衣装名から検索", async ({ page }) => {
  const combobox = page.getByTestId("clothe-combobox");
  await combobox.selectOption("ほしあかり");

  const poemCardIdol = page.getByTestId("poem-card-clothe").first();
  await expect(poemCardIdol, "表示されているポエムの衣装名が正しい").toHaveText(
    "ほしあかり"
  );
});

test("ロゴクリックでリセット", async ({ page }) => {
  // 検索
  await page.getByTestId("poem-textbox").fill("にーちゅ");
  await page.getByTestId("poem-submit-button").click();

  // ロゴをクリック
  await page.getByTestId("logo").click();

  // ポエムがない場合の表示になっているか
  const poemCardNothing = page.getByTestId("poem-card-nothing");
  await expect(poemCardNothing).toHaveText("ポエムが見つかりません…");
});
