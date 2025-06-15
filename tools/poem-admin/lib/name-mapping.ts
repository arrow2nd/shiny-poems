// 簡易的な日本語→ローマ字変換マッピング
// 必要に応じて拡張してください

export const idolNameMapping: Record<string, string> = {
  '櫻木真乃': 'SakuragiMano',
  '風野灯織': 'KazanoHiori',
  '八宮めぐる': 'HachimiyaMeguru',
  '月岡恋鐘': 'TsukiokaKogane',
  '田中摩美々': 'TanakaMamimi',
  '白瀬咲耶': 'ShiraseSakuya',
  '三峰結華': 'MitsumineYuika',
  '幽谷霧子': 'YukokuKiriko',
  '小宮果穂': 'KomiyaKaho',
  '園田智代子': 'SonodaChiyoko',
  '西城樹里': 'SaijoJuri',
  '杜野凛世': 'MorinoRinze',
  '有栖川夏葉': 'ArisugarwaNatsuha',
  '大崎甘奈': 'OsakiAmana',
  '大崎甜花': 'OsakiTenka',
  '桑山千雪': 'KuwayamaChiyuki',
  '芹沢あさひ': 'SerizawaAsahi',
  '黛冬優子': 'MayuzumiFuyuko',
  '和泉愛依': 'IzumiMei',
  '浅倉透': 'AsakuraToru',
  '樋口円香': 'HiguchiMadoka',
  '福丸小糸': 'FukumaruKoito',
  '市川雛菜': 'IchikawaHinana',
  '七草にちか': 'NanakusaNichika',
  '緋田美琴': 'AketaMikoto',
  '斑鳩ルカ': 'IkarugaRuka',
  '七草はづき': 'NanakusaHazuki',
}

// 衣装名の日本語→英語変換（一部の例）
export const clothesNameMapping: Record<string, string> = {
  'セレスティアルカラーズ': 'CelestialColors',
  'シャイニーサマー': 'ShinySummer',
  'ドレスアップパルファム': 'DressUpParfum',
  'ディライトサマー': 'DelightSummer',
  'リスペクティブワークスタイル': 'RespectiveWorkStyle',
  'リフレジェントプルマージュ': 'RefulgentPlumage',
  'バイトゥデイレストラント': 'BaitwudeiRestaurant',
  // 必要に応じて追加
}

export function convertToEnglishId(clothesName: string, idolName: string): string {
  const englishClothes = clothesNameMapping[clothesName] || clothesName.replace(/[^a-zA-Z0-9]/g, '')
  const englishIdol = idolNameMapping[idolName] || idolName.replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
  return `${englishClothes}_${englishIdol}`
}