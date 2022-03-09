import { render } from '@testing-library/react'

import Accent from './accent'

describe('Accent', () => {
  test('スナップショットテスト', () => {
    const { container } = render(<Accent bgColor="F54275" />)
    expect(container).toMatchSnapshot()
  })
})
