import { act, fireEvent, render } from '@testing-library/react'

import CopyButton from './copy'

describe('CopyButton', () => {
  beforeEach(() => {
    // 未実装エラーの対策
    window.prompt = jest.fn()
  })

  test('クリックでアイコンが変化するか', () => {
    const { getByTestId } = render(<CopyButton text="mei" />)
    const button = getByTestId('copy-button')
    const prevInnerHTML = button.innerHTML

    act(() => {
      fireEvent.click(button)
    })

    expect(button.innerHTML).not.toBe(prevInnerHTML)
  })
})
