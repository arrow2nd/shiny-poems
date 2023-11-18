import { expect, test, testid } from "../fixtures";

// NOTE:
// どちらかというとユニットテストで行なうべき項目ですが
// form の action 属性を使っていると jest でテストできないので E2E テストでカバーしています

test.describe("検索時に他の検索欄がクリアされるか", () => {
  test.beforeEach(async ({ shinyPoems: { page } }) => {
    await page.goto("/");
  });

  test("ポエムの一部から検索", async ({ shinyPoems }) => {
    const { page } = shinyPoems;

    await shinyPoems.searchByIdol("七草にちか");
    await shinyPoems.searchByQuery("もぎたて");

    await expect(
      page.getByTestId(testid.idolCombobox),
      "アイドル名の選択がクリアされている"
    ).toHaveValue("empty");

    await shinyPoems.searchByClothe("ジャージ");
    await shinyPoems.searchByQuery("もぎたて");

    await expect(
      page.getByTestId(testid.clotheCombobox),
      "衣装名の選択がクリアされている"
    ).toHaveValue("empty");
  });

  test("アイドル名から検索", async ({ shinyPoems }) => {
    const { page } = shinyPoems;

    await shinyPoems.searchByQuery("もぎたて");
    await shinyPoems.searchByIdol("七草にちか");

    await expect(
      page.getByTestId(testid.queryTextbox),
      "クエリが空になっている"
    ).toHaveValue("");

    await shinyPoems.searchByClothe("ジャージ");
    await shinyPoems.searchByIdol("七草にちか");

    await expect(
      page.getByTestId(testid.clotheCombobox),
      "衣装名の選択がクリアされている"
    ).toHaveValue("empty");
  });

  test("衣装名から検索", async ({ shinyPoems }) => {
    const { page } = shinyPoems;

    await shinyPoems.searchByQuery("もぎたて");
    await shinyPoems.searchByClothe("ジャージ");

    await expect(
      page.getByTestId(testid.queryTextbox),
      "クエリが空になっている"
    ).toHaveValue("");

    await shinyPoems.searchByIdol("七草にちか");
    await shinyPoems.searchByClothe("ジャージ");

    await expect(
      page.getByTestId(testid.idolCombobox),
      "アイドル名の選択がクリアされている"
    ).toHaveValue("empty");
  });
});
