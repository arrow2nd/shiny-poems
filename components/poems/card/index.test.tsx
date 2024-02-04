import { render } from "@testing-library/react";
import { Poem } from "types/poem";
import Card from "./index";

const poem: Poem = {
  id: "HottestSummer_AketaMikoto",
  idolName: "緋田美琴",
  clothesTitle: "ホッテストサマー",
  clothesName: "ホッテストサマー",
  text: "マリンノート＠drown"
};

describe("Card", () => {
  test("内容が表示されている", () => {
    const { getByTestId } = render(<Card poem={poem} />);

    expect(getByTestId("poem-card-text")).toHaveTextContent(poem.text);
    expect(getByTestId("poem-card-clothe")).toHaveTextContent(poem.clothesName);
    expect(getByTestId("poem-card-idol")).toHaveTextContent(poem.idolName);
  });

  test("個人カラーが見付からない場合ブランドカラーが使われる", () => {
    const { getByTestId } = render(
      <Card
        poem={{
          id: "test",
          idolName: "test",
          clothesTitle: "test",
          clothesName: "test",
          text: "test"
        }}
      />
    );

    expect(getByTestId("poem-card-accent")).toHaveStyle(
      "background-color: rgb(120, 174, 255);"
    );
  });

  test("共有リンクの内容が正しい", () => {
    const { getByRole } = render(<Card poem={poem} />);
    const href = getByRole("link").getAttribute("href");

    expect(href).toContain(encodeURIComponent("#シャニマス"));
    expect(href).toContain(encodeURIComponent(`#${poem.clothesName}`));
    expect(href).toContain(encodeURIComponent(`#${poem.idolName}`));
    expect(href).toContain(encodeURIComponent(`?id=${poem.id}`));
  });
});
