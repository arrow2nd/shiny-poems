# shiny-poems

シャニマスの衣装ポエムが検索できる Web アプリ

[![update](https://github.com/arrow2nd/shiny-poems/actions/workflows/update.yaml/badge.svg?branch=main)](https://github.com/arrow2nd/shiny-poems/actions/workflows/update.yaml)
[![test](https://github.com/arrow2nd/shiny-poems/actions/workflows/test.yaml/badge.svg)](https://github.com/arrow2nd/shiny-poems/actions/workflows/test.yaml)
[![e2e](https://github.com/arrow2nd/shiny-poems/actions/workflows/e2e.yaml/badge.svg)](https://github.com/arrow2nd/shiny-poems/actions/workflows/e2e.yaml)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=shiny-poems)](https://shiny-poems.vercel.app)
[![Powered by im@sparql](https://img.shields.io/badge/powered%20by-im%40sparql-F34F6D)](https://sparql.crssnky.xyz/imas/)

![スクリーンショット](https://user-images.githubusercontent.com/44780846/156342031-80268349-68b2-438b-91e6-08c3f8f3265a.png)

## できること

- 衣装ポエムの検索
- ポエムをツイートで共有

## Develop

> **Warning**
>
> OGP 画像の生成には独自に定義した Cloudinary の Named Transformations を利用しています。
> 定義内容についてはリポジトリに含まれていません。

Cloudinary から API Environment variable を取得し、以下の内容で`.env.local`を作成

```
CLOUDINARY_URL=<API Environment variable>
```

その後、以下のコマンドで実行

```
pnpm dev
# or
pnpm build && pnpm start
```

## Thanks!

ポエムや各種データは [im@sparql](https://sparql.crssnky.xyz/imas/) より取得したものを利用しています。
