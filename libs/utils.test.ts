import { getPoem, splitPoemText } from "./utils";

describe("getPoem", () => {
  test("取得できる", () => {
    const poem = getPoem("OvercastMonochrome_FukumaruKoito").at(0);
    expect(poem).toEqual({
      id: "OvercastMonochrome_FukumaruKoito",
      idolName: "福丸小糸",
      clothesTitle: "オーバーキャストモノクローム",
      clothesName: "オーバーキャストモノクローム",
      text: "ワンステップ。いつか、いつかは"
    });
  });

  test("存在しないIDの場合undefinedが返る", () => {
    const poem = getPoem("test").at(0);
    expect(poem).toBeUndefined();
  });
});

describe("splitPoemText", () => {
  test.each`
    poemText                                  | expected
    ${"ワンステップ。この空の上には、何が？"} | ${["ワンステップ。", "この空の上には、何が？"]}
    ${"What's white? すべての恋を跪かせる"}   | ${["What's white?", "すべての恋を跪かせる"]}
    ${"White heart! まだ白く　まだ青く"}      | ${["White heart!", "まだ白く　まだ青く"]}
    ${"スプラッシュ！夏色トライアングル"}     | ${["スプラッシュ！", "夏色トライアングル"]}
  `("正しく分割できるか（text: $poemText）", ({ poemText, expected }) => {
    expect(splitPoemText(poemText)).toEqual(expected);
  });

  test.each`
    poemText                                          | expected
    ${"リフトオフ。ハローハロー！　そちらはどう？"}   | ${["リフトオフ。", "ハローハロー！　そちらはどう？"]}
    ${"勤務回想録。敬礼。スピード厳守してください"}   | ${["勤務回想録。", "敬礼。スピード厳守してください"]}
    ${"サマーダイブ！初めて！　自分で！　選んだ！！"} | ${["サマーダイブ！", "初めて！　自分で！　選んだ！！"]}
    ${"スプラッシュ！困らせないで？PURE MINT"}        | ${["スプラッシュ！", "困らせないで？PURE MINT"]}
    ${"wish!wink!white! くまさんが食べます"}          | ${["wish!wink!white!", "くまさんが食べます"]}
    ${"テスト！！ piyo"}                              | ${["テスト！！", "piyo"]}
  `(
    "複数の句読点・記号を含む文を正しく分割できるか（text: $poemText）",
    ({ poemText, expected }) => {
      expect(splitPoemText(poemText)).toEqual(expected);
    }
  );

  test.each`
    poemText                        | expected
    ${"サイキョーの仲間入り！"}     | ${["サイキョーの仲間入り！"]}
    ${"【特集】今の私はハイカカオ"} | ${["【特集】今の私はハイカカオ"]}
    ${":) かわいいってしあわせ！"}  | ${[":) かわいいってしあわせ！"]}
  `(
    "分割する必要のない文を処理できるか（text: $poemText）",
    ({ poemText, expected }) => {
      expect(splitPoemText(poemText)).toEqual(expected);
    }
  );
});
