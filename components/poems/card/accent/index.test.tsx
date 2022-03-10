import { render } from '@testing-library/react'

import Accent from './index'

test('Accent', () => {
  const { container } = render(<Accent bgColor="F54275" />)
  expect(container).toMatchSnapshot()
})
