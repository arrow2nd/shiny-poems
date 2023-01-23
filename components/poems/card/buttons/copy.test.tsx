import { act, fireEvent, render, waitFor } from '@testing-library/react'

import CopyButton from './copy'

describe('CopyButton', () => {
  const mock = jest.fn()

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: mock
      }
    })
  })

  test('クリックで値がコピーされるか', async () => {
    const { getByTestId } = render(<CopyButton text="mei" />)
    const button = getByTestId('copy-button')

    act(() => {
      fireEvent.click(button)
    })

    await waitFor(() => expect(mock).toBeCalled())
  })
})
