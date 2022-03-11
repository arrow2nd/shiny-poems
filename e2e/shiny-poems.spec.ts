import { expect, test } from '@playwright/test'

test('検索してスクリーンショットを撮影', async ({ page, browserName }) => {
  await page.goto('http://localhost:3000')

  // 検索前のスクリーンショット
  await page.screenshot({
    path: `screenshots/before-${browserName}.png`,
    fullPage: true
  })

  // テキストボックスに入力
  await page.click('[data-testid="poem-search-textbox"]')
  await page
    .locator('[data-testid="poem-search-textbox"]')
    .fill('すまじきものは恋')

  // 検索実行
  await page.click('[data-testid="poem-search-submit"]')

  // コピーボタンをクリック
  await page.locator('[data-testid="copy-button"]').click()

  // コピーテキストのチェック
  if (browserName !== 'firefox') {
    const clipboard = await page.evaluate(async () => {
      return await navigator.clipboard.readText()
    })

    expect(clipboard).toMatch(
      /^ルームウェア。すまじきものは恋\s+#シャニマス\s+#プライベートドレスダウン\s+#杜野凛世\s+https:\/\/shiny-poems\.vercel\.app\?id=PrivateDressDown_MorinoRinze$/
    )
  }

  // 検索結果画面のスクリーンショット
  await page.screenshot({
    path: `screenshots/after-${browserName}.png`,
    fullPage: true
  })
})
