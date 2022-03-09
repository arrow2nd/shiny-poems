import { render } from '@testing-library/react'

import Links from './links'

describe('Links', () => {
  test('スナップショットテスト', () => {
    const { container } = render(<Links />)
    expect(container).toMatchSnapshot()
  })
})
