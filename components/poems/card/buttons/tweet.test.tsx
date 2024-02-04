import { render } from "@testing-library/react";
import TweetButton from "./tweet";

test.each`
  text        | expected
  ${"asahi"}  | ${"asahi"}
  ${"あさひ"} | ${"%E3%81%82%E3%81%95%E3%81%B2"}
`("渡した文字列が正しくURLに埋め込まれているか", ({ text, expected }) => {
  const { getByRole } = render(<TweetButton text={text} />);

  expect(getByRole("link")).toHaveAttribute(
    "href",
    expect.stringMatching(`${expected}$`)
  );
});
