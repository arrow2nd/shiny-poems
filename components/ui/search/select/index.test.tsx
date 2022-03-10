import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import Select from './index'

describe('Select', () => {
  const props = {
    placeholder: 'placeholder',
    options: ['opt1', 'opt2', 'opt3']
  }

  test('プレースホルダが反映されているか', () => {
    const { container } = render(<Select {...props} onChange={jest.fn()} />)
    expect(container).toMatchSnapshot()
  })

  test('文字列を入力して要素を選択できるか', async () => {
    const mock = jest.fn()
    const { container, getByRole } = render(
      <Select {...props} onChange={mock} />
    )

    await act(async () => {
      const combobox = getByRole('combobox')

      fireEvent.change(combobox, {
        target: { value: '1' }
      })

      // ドロップダウンが開くまで待機
      await new Promise((r) => setTimeout(r, 100))

      fireEvent.keyDown(combobox, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13
      })
    })

    expect(container).toMatchSnapshot()
  })
})
