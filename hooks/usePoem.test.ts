import { renderHook } from '@testing-library/react'

import { usePoem } from './usePoem'

describe('usePoem', () => {
  test.each`
    type              | keyword         | idRegExp
    ${'idolName'}     | ${'櫻木真乃'}   | ${/^.+_SakuragiMano$/}
    ${'clothesTitle'} | ${'ほしあかり'} | ${/^HoshiAkari_.+$/}
    ${'text'}         | ${'もぎたて'}   | ${/^RefreshSummer_HiguchiMadoka$/}
  `(
    '正しく検索できるか（検索条件: $type / キーワード: $keyword）',
    ({ type, keyword, idRegExp }) => {
      const { result } = renderHook(() => usePoem(type, keyword))

      // データが存在するか
      expect(result.current.length).toBeGreaterThan(0)

      // idの形式が正しいか
      for (const poem of result.current) {
        // シリーズ衣装はidの形式が異なるのでスキップ
        if (/シリーズ$/.test(poem.clothesTitle)) continue
        expect(poem.id).toMatch(idRegExp)
      }
    }
  )

  test.each`
    type              | keyword
    ${''}             | ${''}
    ${'idolName'}     | ${'@test@'}
    ${'clothesTitle'} | ${'@test@'}
    ${'text'}         | ${'@test@'}
  `(
    '存在しない場合にエラーが発生しないか（検索条件: $type / キーワード: $keyword）',
    ({ type, keyword }) => {
      const { result } = renderHook(() => usePoem(type, keyword))
      expect(result.current.length).toBe(0)
    }
  )
})
