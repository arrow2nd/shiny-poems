import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let clothesName = "",
    idolName = "",
    existingIds = [];

  try {
    const requestData = await request.json();
    clothesName = requestData.clothesName;
    idolName = requestData.idolName;
    existingIds = requestData.existingIds;

    console.log("=== Smart ID Generation ===");
    console.log("Input:", { clothesName, idolName });

    // 改良されたスマートID生成
    const clothesMapping = {
      'エモーショナルユニフォーム': 'EmotionalUniform',
      'リスペクティブワークスタイル': 'RespectiveWorkStyle',
      'セレスティアルカラーズ': 'CelestialColors',
      'シャイニーサマー': 'ShinySummer',
      'ドレスアップパルファム': 'DressUpParfum',
      'ディライトサマー': 'DelightSummer',
      'リフレジェントプルマージュ': 'RefulgentPlumage',
      'バイトゥデイレストラント': 'BaitwudeiRestaurant',
      'アモールオブホワイト': 'AmourOfWhite',
      'アソートパフェ': 'AssortParfait',
      'オールオブショーオフ': 'AllOfShowOff',
      'フルールブランシュ': 'FleurBlanche',
      'プレシャスアクアリウム': 'PreciousAquarium'
    };

    const idolMapping = {
      '小宮果穂': 'KomiyaKaho',
      '郁田はるき': 'IkutaHaruki',
      '櫻木真乃': 'SakuragiMano',
      '風野灯織': 'KazanoHiori',
      '八宮めぐる': 'HachimiyaMeguru',
      '月岡恋鐘': 'TsukiokaKogane',
      '田中摩美々': 'TanakaMamimi',
      '白瀬咲耶': 'ShiraseSakuya',
      '三峰結華': 'MitsumineYuika',
      '幽谷霧子': 'YukokuKiriko',
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
      '七草はづき': 'NanakusaHazuki'
    };

    // 英語変換
    const englishClothes = clothesMapping[clothesName] || 
      clothesName
        .replace(/ー/g, '') // 長音記号を削除
        .replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, ''); // 特殊文字削除

    const englishIdol = idolMapping[idolName] || 
      idolName
        .replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, ''); // 特殊文字削除

    const generatedId = `${englishClothes}_${englishIdol}`;
    console.log("Generated ID:", generatedId);

    // 重複チェック
    if (existingIds.includes(generatedId)) {
      console.log("ID already exists, adding suffix...");
      let counter = 2;
      let uniqueId = `${generatedId}_${counter}`;
      while (existingIds.includes(uniqueId)) {
        counter++;
        uniqueId = `${generatedId}_${counter}`;
      }
      console.log("Unique ID:", uniqueId);
      return NextResponse.json({ id: uniqueId });
    }

    return NextResponse.json({ id: generatedId });

  } catch (error) {
    console.error("ID generation error:", error);

    // 最後のフォールバック
    const fallbackId = `${clothesName.replace(/[^a-zA-Z0-9]/g, '')}_${idolName.replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')}`;
    return NextResponse.json({ id: fallbackId });
  }
}
