import { render } from '@testing-library/react'

import Accent from './index'

describe('Accent', () => {
  test('指定したカラーコードが設定されているか', () => {
    const { container } = render(<Accent bgColor="F54275" />)

    expect(container.children[0]).toHaveStyle(
      `background-color: rgb(245, 66, 117);`
    )
  })
})
