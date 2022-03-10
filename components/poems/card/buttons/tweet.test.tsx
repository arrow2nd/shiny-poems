import { render } from '@testing-library/react'

import TweetButton from './tweet'

describe('TweetButton', () => {
  test.each(['asahi', 'あさひ'])(
    '渡した文字列が正しくURLに埋め込まれているか',
    (text) => {
      const { container } = render(<TweetButton text={text} />)
      expect(container).toMatchSnapshot()
    }
  )
})
