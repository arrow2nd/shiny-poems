import { searchPoems } from "./search";

describe("searchPoems", () => {
  test("ポエムの一部から検索できる", async () => {
    const result = await searchPoems({
      type: "poem",
      q: "たとえ堕ちるとも君となら"
    });

    expect(result).toEqual([
      {
        id: "OpporsiParadiso_OsakiAmana",
        idolName: "大崎甘奈",
        clothesTitle: "オポーズパラディーソ",
        clothesName: "オポーズパラディーソ",
        text: "たとえ堕ちるとも君となら"
      }
    ]);
  });

  test("アイドル名から検索できる", async () => {
    const result = await searchPoems({ type: "idol", q: "小糸" });

    expect(result.some((p) => p.idolName === "福丸小糸")).toBeTruthy();
  });

  test("衣装名から検索できる", async () => {
    const result = await searchPoems({ type: "clothe", q: "ジャージ" });

    expect(result.some((p) => p.clothesTitle === "ジャージ")).toBeTruthy();
  });
});
