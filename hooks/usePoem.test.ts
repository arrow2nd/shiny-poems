import { renderHook } from '@testing-library/react-hooks'

import { usePoem } from './usePoem'

describe('usePoem', () => {
  test.each`
    type              | keyword         | isExist  | idRegExp
    ${'idolName'}     | ${'櫻木真乃'}   | ${true}  | ${/^.+_SakuragiMano$/}
    ${'clothesTitle'} | ${'ほしあかり'} | ${true}  | ${/^HoshiAkari_.+$/}
    ${'text'}         | ${'もぎたて'}   | ${true}  | ${/^RefreshSummer_HiguchiMadoka$/}
    ${''}             | ${''}           | ${false} | ${undefined}
    ${'text'}         | ${'@test@'}     | ${false} | ${undefined}
  `(
    '検索条件: $type / キーワード: $keyword のときに正しく検索できるか',
    ({ type, keyword, isExist, idRegExp }) => {
      const results = renderHook(() => usePoem(type, keyword)).result

      // データが存在するか
      expect(results.current.length > 0).toBe(isExist)
      if (!isExist) return

      // idの形式が正しいか
      for (const poem of results.current) {
        // シリーズ衣装はidの形式が異なるのでスキップ
        if (/シリーズ$/.test(poem.clothesTitle)) continue
        expect(poem.id).toMatch(idRegExp)
      }
    }
  )
})
