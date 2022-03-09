import { render } from '@testing-library/react'

import TweetButton from './tweet'

describe('TweetButton', () => {
  test.each(['asahi', 'あさひ'])('スナップショットテスト', (text) => {
    const { container } = render(<TweetButton text={text} />)
    expect(container).toMatchSnapshot()
  })
})
