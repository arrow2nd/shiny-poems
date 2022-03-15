import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import Select from './index'

describe('Select', () => {
  const props = {
    placeholder: 'placeholder',
    options: ['opt1', 'opt2', 'opt3']
  }

  test('プレースホルダが設定されているか', () => {
    const { container } = render(<Select {...props} onChange={jest.fn()} />)
    expect(container).toContainHTML('<p>placeholder</p>')
  })

  test('見つからなかった時の表示が出るか', () => {
    const { getByRole, getByText } = render(
      <Select {...props} onChange={jest.fn()} />
    )

    act(() => {
      fireEvent.change(getByRole('combobox'), { target: { value: 'aaa' } })
    })

    expect(getByText('見つかりません…')).toBeTruthy()
  })

  test('要素を選択した後にコールバックが呼び出されるか', async () => {
    const mock = jest.fn()
    const { getByRole, getByText } = render(
      <Select {...props} onChange={mock} />
    )

    await act(async () => {
      const combobox = getByRole('combobox')

      fireEvent.change(combobox, { target: { value: '1' } })

      // ドロップダウンが開くまでラグがあるので待機
      await new Promise((r) => setTimeout(r, 50))

      fireEvent.keyDown(combobox, { key: 'Enter', code: 'Enter', charCode: 13 })
    })

    expect(getByText('opt1')).toBeTruthy()
    expect(mock).toBeCalled()
  })
})
