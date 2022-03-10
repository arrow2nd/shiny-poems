import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import Search from './index'

describe('Search', () => {
  const sleep = () => new Promise((r) => setTimeout(r, 50))

  const keyDownEnter = {
    key: 'Enter',
    code: 'Enter',
    charCode: 13
  }

  test('見た目が変化していないか', () => {
    const { container } = render(<Search onSearch={jest.fn()} />)
    expect(container).toMatchSnapshot()
  })

  test('検索欄入力後に他の検索欄がクリアされるか', async () => {
    const mock = jest.fn()
    const { container, getByRole, getAllByRole } = render(
      <Search onSearch={mock} />
    )

    const textbox = getByRole('textbox')

    // アイドル名のコンボボックスを選択
    await act(async () => {
      const idolCombobox = getAllByRole('combobox')[0]

      fireEvent.change(idolCombobox, {
        target: { value: 'あさひ' }
      })

      await sleep()

      fireEvent.keyDown(idolCombobox, keyDownEnter)
    })

    expect(mock).toBeCalledTimes(1)
    expect(textbox).not.toHaveValue('もぎたて')
    expect(container).toHaveTextContent('芹沢あさひ')
    expect(container).not.toHaveTextContent('ジャージ')

    // 衣装名のコンボボックスを選択
    await act(async () => {
      const clothesCombobox = getAllByRole('combobox')[1]

      fireEvent.change(clothesCombobox, {
        target: { value: 'ジャージ' }
      })

      await sleep()

      fireEvent.keyDown(clothesCombobox, keyDownEnter)
    })

    expect(mock).toBeCalledTimes(2)
    expect(textbox).not.toHaveValue('もぎたて')
    expect(container).not.toHaveTextContent('芹沢あさひ')
    expect(container).toHaveTextContent('ジャージ')

    // 本文検索欄に入力して確定
    act(() => {
      fireEvent.change(textbox, {
        target: { value: 'もぎたて' }
      })

      fireEvent.keyDown(textbox, keyDownEnter)
    })

    expect(mock).toBeCalledTimes(3)
    expect(textbox).toHaveValue('もぎたて')
    expect(container).not.toHaveTextContent('芹沢あさひ')
    expect(container).not.toHaveTextContent('ジャージ')
  })
})
