import { render } from "@testing-library/react";
import Link from "./link";

describe("Link", () => {
  const props = {
    title: "サンプル",
    href: "http://example.com/"
  };

  test("子要素を表示できる", () => {
    const { getByText } = render(<Link {...props}>test</Link>);
    expect(getByText("test")).toBeDefined();
  });

  test("子要素が省略された場合にtitleが表示される", () => {
    const { getByText } = render(<Link {...props} />);
    expect(getByText(props.title)).toBeDefined();
  });
});
