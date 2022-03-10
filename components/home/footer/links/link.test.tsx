import { render } from '@testing-library/react'

import Link from './link'

describe('Link', () => {
  test.each`
    className    | title     | children
    ${undefined} | ${'test'} | ${(<p>test</p>)}
    ${undefined} | ${'TEST'} | ${undefined}
    ${'m-1'}     | ${'test'} | ${(<p>test</p>)}
    ${'m-1'}     | ${'TEST'} | ${undefined}
  `('設定したPropsが反映されているか', (props) => {
    const { container } = render(<Link {...props} href="http://example.com/" />)
    expect(container).toMatchSnapshot()
  })
})
