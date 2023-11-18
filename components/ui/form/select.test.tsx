import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "./select";

describe("Select", () => {
  test("初期状態でプレースホルダが設定されている", () => {
    const { getByRole } = render(
      <Select placeholder="プレースホルダ">
        <option value="1">test_1</option>
      </Select>
    );

    expect(getByRole("combobox")).toHaveValue("empty");
  });

  test("オプションを選択すると値が設定される", async () => {
    const { getByRole } = render(
      <Select placeholder="プレースホルダ">
        <option value="1">test_1</option>
      </Select>
    );

    const select = getByRole("combobox");

    const user = userEvent.setup();
    await user.selectOptions(select, "test_1");

    expect(select).toHaveValue("1");
  });

  test("値が変わった時にコールバックが呼ばれる", async () => {
    const mock = jest.fn();

    const { getByRole } = render(
      <Select placeholder="プレースホルダ" onChange={mock}>
        <option value="1">test_1</option>
      </Select>
    );

    const select = getByRole("combobox");

    const user = userEvent.setup();
    await user.selectOptions(select, "test_1");

    expect(mock).toHaveBeenCalled();
  });
});
