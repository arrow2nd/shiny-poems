import { Query } from "types/query";

/**
 * 検索クエリの相対パスを生成する
 * @param type 検索タイプ
 * @param q 検索クエリ
 * @returns パス
 */
export function generateSearchQueryPath(
  type: NonNullable<Query["type"]>,
  q: string
): string {
  const searchParams = new URLSearchParams();
  searchParams.set("type", type);
  searchParams.set("q", q);

  return `/?${searchParams.toString()}`;
}
