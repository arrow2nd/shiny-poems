import { expect, test } from "@playwright/test";

test("IDで指定したポエムが表示される", async ({ page }) => {
  const searchParams = new URLSearchParams();
  searchParams.set("id", "CelestialColors_YukokuKiriko");
  await page.goto(`/?${searchParams.toString()}`);

  const idolName = page.getByTestId("poem-card-idol").first();
  await expect(idolName, "アイドル名が正しい").toHaveText("幽谷霧子");

  const clotheName = page.getByTestId("poem-card-clothe").first();
  await expect(clotheName, "衣装名が正しい").toHaveText(
    "セレスティアルカラーズ"
  );
});

test("ポエムの一部から検索", async ({ page }) => {
  const searchParams = new URLSearchParams();
  searchParams.set("type", "poem");
  searchParams.set("q", "すまじきものは恋");

  await page.goto(`/?${searchParams.toString()}`);

  const poemText = page.getByTestId("poem-card-text").getByRole("paragraph");
  await expect(poemText, "一致するポエムが表示されている").toHaveText([
    "ルームウェア。",
    "すまじきものは恋"
  ]);
});

test("アイドル名から検索", async ({ page }) => {
  const searchParams = new URLSearchParams();
  searchParams.set("type", "idol");
  searchParams.set("q", "櫻木真乃");

  await page.goto(`/?${searchParams.toString()}`);

  const poemCardIdol = page.getByTestId("poem-card-idol").first();
  await expect(
    poemCardIdol,
    "表示されているポエムのアイドル名が正しい"
  ).toHaveText("櫻木真乃");
});

test("衣装名から検索", async ({ page }) => {
  const searchParams = new URLSearchParams();
  searchParams.set("type", "clothe");
  searchParams.set("q", "ほしあかり");

  await page.goto(`/?${searchParams.toString()}`);

  const poemCardClothe = page.getByTestId("poem-card-clothe").first();
  await expect(
    poemCardClothe,
    "表示されているポエムの衣装名が正しい"
  ).toHaveText("ほしあかり");
});
