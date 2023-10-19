import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Form from "./index";

describe("Search", () => {
  const sleep = () => new Promise((r) => setTimeout(r, 50));
  const keyDownEnter = { key: "Enter", code: "Enter", charCode: 13 };

  test("見た目が変化していないか", () => {
    const { container } = render(<Form onSearch={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  test("検索時に他の検索欄がクリアされるか", async () => {
    const { container, getByRole, getAllByRole } = render(
      <Form onSearch={jest.fn()} />
    );

    const textbox = getByRole("textbox");
    const combobox = getAllByRole("combobox");

    // アイドル名のコンボボックスを選択
    await act(async () => {
      fireEvent.change(combobox[0], { target: { value: "あさひ" } });
      await sleep();
      fireEvent.keyDown(combobox[0], keyDownEnter);
    });

    expect(textbox).not.toHaveValue("もぎたて");
    expect(container).toHaveTextContent("芹沢あさひ");
    expect(container).not.toHaveTextContent("ジャージ");

    // 衣装名のコンボボックスを選択
    await act(async () => {
      fireEvent.change(combobox[1], { target: { value: "ジャージ" } });
      await sleep();
      fireEvent.keyDown(combobox[1], keyDownEnter);
    });

    expect(textbox).not.toHaveValue("もぎたて");
    expect(container).not.toHaveTextContent("芹沢あさひ");
    expect(container).toHaveTextContent("ジャージ");

    // 本文検索欄に入力して確定
    act(() => {
      fireEvent.change(textbox, { target: { value: "もぎたて" } });
      fireEvent.keyDown(textbox, keyDownEnter);
    });

    expect(textbox).toHaveValue("もぎたて");
    expect(container).not.toHaveTextContent("芹沢あさひ");
    expect(container).not.toHaveTextContent("ジャージ");
  });
});
