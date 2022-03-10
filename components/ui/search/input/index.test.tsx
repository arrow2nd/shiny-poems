import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'
import { act } from 'react-dom/test-utils'

import Input from './index'

describe('Input', () => {
  test('ボタン押下でコールバックが呼び出されるか', () => {
    const mock = jest.fn()
    const { getByRole } = render(<Input placeholder="test" onSubmit={mock} />)

    act(() => {
      fireEvent.click(getByRole('button'))
    })

    expect(mock).toBeCalled()
  })

  test('Enter入力でコールバックが呼び出されるか', () => {
    const mock = jest.fn()
    const { getByRole } = render(
      <Input placeholder="test" onSubmit={mock} ref={createRef()} />
    )

    act(() => {
      fireEvent.keyDown(getByRole('textbox'), {
        key: 'Enter',
        code: 'Enter',
        charCode: 13
      })
    })

    expect(mock).toBeCalled()
  })
})
