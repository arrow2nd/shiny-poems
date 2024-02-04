import { fireEvent, render, waitFor } from "@testing-library/react";
import CopyButton from "./copy";

const mock = jest.fn();

beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: mock
    }
  });
});

test("クリックで値がコピーされるか", async () => {
  const { getByTestId } = render(<CopyButton text="mei" />);
  const button = getByTestId("copy-button");

  fireEvent.click(button);

  await waitFor(() => expect(mock).toHaveBeenCalled());
});
