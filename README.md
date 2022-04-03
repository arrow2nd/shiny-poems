# shiny-poems

シャニマスの衣装ポエムが検索できる Web アプリ

[![update](https://github.com/arrow2nd/shiny-poems/actions/workflows/update.yaml/badge.svg?branch=main)](https://github.com/arrow2nd/shiny-poems/actions/workflows/update.yaml)
[![test](https://github.com/arrow2nd/shiny-poems/actions/workflows/test.yaml/badge.svg)](https://github.com/arrow2nd/shiny-poems/actions/workflows/test.yaml)
[![e2e](https://github.com/arrow2nd/shiny-poems/actions/workflows/e2e.yaml/badge.svg)](https://github.com/arrow2nd/shiny-poems/actions/workflows/e2e.yaml)
[![Depfu](https://badges.depfu.com/badges/81319e043b4dd2c4c4bae34a26529948/overview.svg)](https://depfu.com/github/arrow2nd/shiny-poems?project_id=34201)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=shiny-poems)](https://shiny-poems.vercel.app)
[![GitHub license](https://img.shields.io/github/license/arrow2nd/shiny-poems)](https://github.com/arrow2nd/shiny-poems/blob/main/LICENSE)

![スクリーンショット](https://user-images.githubusercontent.com/44780846/156342031-80268349-68b2-438b-91e6-08c3f8f3265a.png)

## できること

- 衣装ポエムの検索
- ポエムをツイートで共有

## 実行

Cloudinary から API Environment variable を取得し、以下の内容で`.env.local`を作成

```
CLOUDINARY_URL=<API Environment variable>
```

その後、以下のコマンドで実行

```
# ビルド & 実行
yarn build & yarn start
```

## Thanks!

ポエムや各種データは [im@sparql](https://sparql.crssnky.xyz/imas/) より取得したものを利用しています。
