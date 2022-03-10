import { encodeForCloudinary, splitPoemText } from './util'

describe('splitPoemText', () => {
  test.each`
    poemText                                        | expected
    ${'ワンステップ。この空の上には、何が？'}       | ${['ワンステップ。', 'この空の上には、何が？']}
    ${'【特集】今の私はハイカカオ'}                 | ${['【特集】今の私はハイカカオ']}
    ${"What's white? すべての恋を跪かせる"}         | ${["What's white?", 'すべての恋を跪かせる']}
    ${'White heart! まだ白く　まだ青く'}            | ${['White heart!', 'まだ白く　まだ青く']}
    ${'スプラッシュ！夏色トライアングル'}           | ${['スプラッシュ！', '夏色トライアングル']}
    ${'勤務回想録。敬礼。スピード厳守してください'} | ${['勤務回想録。', '敬礼。スピード厳守してください']}
  `('「$poemText」を2行に分割すると $expected', ({ poemText, expected }) => {
    expect(splitPoemText(poemText)).toEqual(expected)
  })
})

describe('encodeForCloudinary', () => {
  test.each`
    text          | expected
    ${'緋田美琴'} | ${'%E7%B7%8B%E7%94%B0%E7%BE%8E%E7%90%B4'}
    ${'a,b/c!d'}  | ${'a%252Cb%252Fc%2521d'}
  `('$text をエンコードすると $expected', ({ text, expected }) => {
    expect(encodeForCloudinary(text)).toEqual(expected)
  })
})
