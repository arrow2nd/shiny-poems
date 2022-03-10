import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import Search from './index'

describe('Search', () => {
  test('検索欄入力後に他の検索欄がクリアされるか', async () => {
    const sleep = () => new Promise((r) => setTimeout(r, 100))

    const mock = jest.fn()
    const { container, getByRole, getAllByRole } = render(
      <Search onSearch={mock} />
    )

    // アイドル名のコンボボックスを選択
    await act(async () => {
      const idolCombobox = getAllByRole('combobox')[0]

      fireEvent.change(idolCombobox, {
        target: { value: 'あさひ' }
      })

      await sleep()

      fireEvent.keyDown(idolCombobox, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13
      })
    })

    expect(mock).toBeCalledTimes(1)
    expect(container).toMatchSnapshot()

    // 衣装名のコンボボックスを選択
    await act(async () => {
      const clothesCombobox = getAllByRole('combobox')[1]

      fireEvent.change(clothesCombobox, {
        target: { value: 'ジャージ' }
      })

      await sleep()

      fireEvent.keyDown(clothesCombobox, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13
      })
    })

    expect(mock).toBeCalledTimes(2)
    expect(container).toMatchSnapshot()

    // 本文検索欄に入力して確定
    act(() => {
      const textbox = getByRole('textbox')

      fireEvent.change(textbox, {
        target: { value: 'もぎたて' }
      })

      fireEvent.keyDown(textbox, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13
      })
    })

    expect(mock).toBeCalledTimes(3)
    expect(container).toMatchSnapshot()
  })
})
