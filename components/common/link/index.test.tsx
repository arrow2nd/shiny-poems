import { render } from '@testing-library/react'

import Link from './index'

describe('Link', () => {
  test.each`
    className    | children
    ${'m-1'}     | ${(<span>TEST</span>)}
    ${'m-1'}     | ${undefined}
    ${undefined} | ${(<p>test</p>)}
    ${undefined} | ${undefined}
  `('設定したPropsが反映されているかどうか', (props) => {
    const { container } = render(
      <Link {...props} title="test" href="http://example.com/" />
    )
    expect(container).toMatchSnapshot()
  })
})
