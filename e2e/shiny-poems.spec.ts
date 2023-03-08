import { expect, test } from "@playwright/test";

test("検索して画面を記録", async ({ contextOptions, browser }, { project }) => {
  const saveDir = `e2e/results/${project.name}`;
  const context = await browser.newContext({
    ...contextOptions,
    recordVideo: { dir: saveDir }
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3000");

  // テキストボックスに入力
  await page.click('[data-testid="poem-search-textbox"]');
  await page
    .locator('[data-testid="poem-search-textbox"]')
    .fill("すまじきものは恋");

  // 検索実行
  await page.click('[data-testid="poem-search-submit"]');
  await expect(page.locator('[data-testid="poem-card-text"] > p')).toHaveText([
    "ルームウェア。",
    "すまじきものは恋"
  ]);

  // ページ全体のスクリーンショット
  await page.screenshot({ path: `${saveDir}/full-page.png`, fullPage: true });

  await context.close();
});
