import { fireEvent, render } from "@testing-library/react";
import { createRef } from "react";
import { act } from "react-dom/test-utils";

import Input from "./index";

describe("Input", () => {
  test("検索ボタン押下でコールバックが呼び出されるか", () => {
    const mock = jest.fn();
    const { getByTestId } = render(
      <Input placeholder="test" onSubmit={mock} />
    );

    act(() => {
      fireEvent.click(getByTestId("poem-search-submit"));
    });

    expect(mock).toBeCalled();
  });

  test("Enter入力でコールバックが呼び出されるか", () => {
    const mock = jest.fn();
    const { getByTestId } = render(
      <Input placeholder="test" onSubmit={mock} ref={createRef()} />
    );

    act(() => {
      fireEvent.keyDown(getByTestId("poem-search-textbox"), {
        key: "Enter",
        code: "Enter",
        charCode: 13
      });
    });

    expect(mock).toBeCalled();
  });
});
