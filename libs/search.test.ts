import { State, searchPoems } from "./search";

describe("searchPoems", () => {
  test("検索条件が無い場合渡したstateがそのまま返る", async () => {
    const state: State = {
      poems: [
        {
          id: "Pajamas_De_Penpen",
          idolName: "杜野凛世",
          clothesTitle: "パジャマ・デシリーズ",
          clothesName: "パジャマ・デ・ペンペン",
          text: "スリープオーバー。飛べる、飛べる。飛べるさ"
        }
      ]
    };

    const formData = new FormData();
    const result = await searchPoems(state, formData);

    expect(result.poems).toEqual(state.poems);
  });

  test("ポエムの一部から検索できる", async () => {
    const formData = new FormData();
    formData.append("query", "たとえ堕ちるとも君となら");

    const result = await searchPoems({ poems: [] }, formData);

    expect(result.poems).toEqual([
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
    const formData = new FormData();
    formData.append("idol", "小糸");

    const result = await searchPoems({ poems: [] }, formData);

    expect(result.poems.some((p) => p.idolName === "福丸小糸")).toBeTruthy();
  });

  test("衣装名から検索できる", async () => {
    const formData = new FormData();
    formData.append("clothe", "ジャージ");

    const result = await searchPoems({ poems: [] }, formData);

    expect(
      result.poems.some((p) => p.clothesTitle === "ジャージ")
    ).toBeTruthy();
  });
});
