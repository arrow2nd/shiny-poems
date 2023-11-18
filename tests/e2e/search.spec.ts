import { expect, test } from "../fixtures";

test.beforeEach(async ({ shinyPoems: { page } }) => {
  await page.goto("/");
});

test("ポエムの一部から検索", async ({ shinyPoems }) => {
  await shinyPoems.searchByQuery("すまじきものは恋");

  const poemText = shinyPoems.page
    .getByTestId("poem-card-text")
    .getByRole("paragraph");

  await expect(poemText, "一致するポエムが表示されている").toHaveText([
    "ルームウェア。",
    "すまじきものは恋"
  ]);
});

test("アイドル名から検索", async ({ shinyPoems }) => {
  await shinyPoems.searchByIdol("櫻木真乃");

  const poemCardIdol = shinyPoems.page.getByTestId("poem-card-idol").first();
  await expect(
    poemCardIdol,
    "表示されているポエムのアイドル名が正しい"
  ).toHaveText("櫻木真乃");
});

test("衣装名から検索", async ({ shinyPoems }) => {
  await shinyPoems.searchByClothe("ほしあかり");

  const poemCardIdol = shinyPoems.page.getByTestId("poem-card-clothe").first();
  await expect(poemCardIdol, "表示されているポエムの衣装名が正しい").toHaveText(
    "ほしあかり"
  );
});

test("ロゴクリックでリセット", async ({ shinyPoems }) => {
  // 検索
  await shinyPoems.searchByQuery("にーちゅ");

  // ロゴをクリック
  await shinyPoems.page.getByTestId("logo").click();

  // ポエムがない場合の表示になっているか
  const poemCardNothing = shinyPoems.page.getByTestId("poem-card-nothing");
  await expect(poemCardNothing).toHaveText("ポエムが見つかりません…");
});
