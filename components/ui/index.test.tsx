import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import UI from './index'

describe('UI', () => {
  const sleep = () => new Promise((r) => setTimeout(r, 50))
  const keyDownEnter = { key: 'Enter', code: 'Enter', charCode: 13 }

  test('idパラメータで指定されたポエムが表示できるか', async () => {
    const poem = 'よろこびは輝く星をともに纏う'
    const { getByText } = render(<UI poemText={poem} />)

    expect(getByText(poem)).toBeTruthy()
  })

  test('本文を指定して検索できるか', async () => {
    const { getByRole, getByText } = render(<UI poemText="" />)

    await act(async () => {
      const textbox = getByRole('textbox')

      fireEvent.change(textbox, { target: { value: '明日もし羽が生えたら' } })
      fireEvent.keyDown(textbox, keyDownEnter)
    })

    expect(getByText('スタッカート。')).toBeTruthy()
    expect(getByText('サンセットスカイパッセージ')).toBeTruthy()
    expect(getByText('福丸小糸')).toBeTruthy()
  })

  test('アイドル名を指定して検索できるか', async () => {
    const { getAllByRole, getByText } = render(<UI poemText="" />)

    await act(async () => {
      const idolCombobox = getAllByRole('combobox')[0]

      fireEvent.change(idolCombobox, { target: { value: '浅倉透' } })
      await sleep()
      fireEvent.keyDown(idolCombobox, keyDownEnter)
    })

    expect(getByText('はい、心臓出してー')).toBeTruthy()
    expect(getByText('トオル・スターダスト')).toBeTruthy()
  })

  test('衣装名を指定して検索できるか', async () => {
    const { getAllByRole, getByText } = render(<UI poemText="" />)

    await act(async () => {
      const clothesCombobox = getAllByRole('combobox')[1]

      fireEvent.change(clothesCombobox, { target: { value: 'ほしあかり' } })
      await sleep()
      fireEvent.keyDown(clothesCombobox, keyDownEnter)
    })

    expect(getByText('跳ねる気持ちを浅縹は知っている')).toBeTruthy()
    expect(getByText('八宮めぐる')).toBeTruthy()
  })

  test('見つからなかった時の表示が出るか', async () => {
    const { getByRole, getByText } = render(<UI poemText="" />)

    await act(async () => {
      const textbox = getByRole('textbox')

      fireEvent.change(textbox, { target: { value: 'test' } })
      fireEvent.keyDown(textbox, keyDownEnter)
    })

    expect(getByText('ポエムが見つかりません…')).toBeTruthy()
  })
})
