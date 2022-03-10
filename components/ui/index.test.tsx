import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import UI from './index'

describe('UI', () => {
  test('衣装名を指定して検索できるか', async () => {
    const { container, getAllByRole } = render(<UI poemText="" />)

    // 衣装名のコンボボックスを選択
    await act(async () => {
      const clothesCombobox = getAllByRole('combobox')[1]

      fireEvent.change(clothesCombobox, {
        target: { value: 'ほしあかり' }
      })

      await new Promise((r) => setTimeout(r, 100))

      fireEvent.keyDown(clothesCombobox, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13
      })
    })

    expect(container).toMatchSnapshot()
  })
})
