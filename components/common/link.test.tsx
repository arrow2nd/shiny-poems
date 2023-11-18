import { render } from "@testing-library/react";

import Link from "./link";

describe("Link", () => {
  const props = {
    title: "サンプル",
    href: "http://example.com/"
  };

  test("title, hrefが正しく設定できているか", () => {
    const { getByRole } = render(<Link {...props} />);
    const link = getByRole("link");

    expect(link).toHaveAttribute("title", props.title);
    expect(link).toHaveAttribute("href", props.href);
  });

  test("子要素を表示できるか", () => {
    const { getByRole } = render(
      <Link {...props}>
        <p>test</p>
      </Link>
    );
    const link = getByRole("link");

    expect(link).toContainHTML("<p>test</p>");
  });

  test("子要素が省略された場合にtitle文字列を表示できるか", () => {
    const { getByText } = render(<Link {...props} />);
    expect(getByText(props.title)).toBeTruthy();
  });
});
