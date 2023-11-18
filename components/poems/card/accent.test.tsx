import { render } from "@testing-library/react";

import Accent from "./accent";

test("指定したカラーコードが設定されているか", () => {
  const { getByTestId } = render(<Accent bgColor="F54275" />);

  expect(getByTestId("poem-card-accent")).toHaveStyle(
    "background-color: rgb(245, 66, 117);"
  );
});
