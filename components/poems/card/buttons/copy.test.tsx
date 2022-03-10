import { act, render } from '@testing-library/react'

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
      container.children[0].dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )
    })

    expect(container).toMatchSnapshot()
  })
})
