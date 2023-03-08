import { render } from "@testing-library/react";

import Links from "./index";

test("Links", () => {
  const { container } = render(<Links />);
  expect(container).toMatchSnapshot();
});
