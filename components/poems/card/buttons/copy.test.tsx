import { act, fireEvent, render } from '@testing-library/react'

import CopyButton from './copy'

describe('CopyButton', () => {
  beforeEach(() => {
    // 未実装エラーの対策
    window.prompt = jest.fn()
  })

  test('クリック前の表示が正しいか', () => {
    const { container } = render(<CopyButton text="asahi" />)
    expect(container).toMatchSnapshot()
  })

  test('クリックするとアイコンが変更されるか', () => {
    const { container } = render(<CopyButton text="mei" />)

    act(() => {
      fireEvent.click(container.children[0])
    })

    expect(container).toMatchSnapshot()
  })
})
