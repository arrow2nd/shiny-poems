import { expect, test } from '@playwright/test'

test('検索してスクリーンショットを撮影', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000')

  // 検索前のスクリーンショット
  await page.screenshot({
    path: `screenshots/before-${testInfo.project.name}.png`,
    fullPage: true
  })

  // テキストボックスに入力
  await page.click('[data-testid="poem-search-textbox"]')
  await page
    .locator('[data-testid="poem-search-textbox"]')
    .fill('すまじきものは恋')

  // 検索実行
  await page.click('[data-testid="poem-search-submit"]')

  await expect(page.locator('[data-testid="poem-card-text"] > p')).toHaveText([
    'ルームウェア。',
    'すまじきものは恋'
  ])

  // 検索結果画面のスクリーンショット
  await page.screenshot({
    path: `screenshots/after-${testInfo.project.name}.png`,
    fullPage: true
  })
})
