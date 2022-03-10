import { act, fireEvent, render } from '@testing-library/react'

import CopyButton from './copy'

describe('CopyButton', () => {
  beforeEach(() => {
    // 未実装エラーの対策
    window.prompt = jest.fn()
  })

  test('クリックでアイコンが変化するか', () => {
    const { getByRole } = render(<CopyButton text="mei" />)
    const button = getByRole('button')
    const prevInnerHTML = button.innerHTML

    act(() => {
      fireEvent.click(button)
    })

    expect(button.innerHTML).not.toBe(prevInnerHTML)
  })
})
