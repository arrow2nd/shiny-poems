import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let clothesName = "",
    idolName = "",
    existingIds: string[] = [];

  try {
    const requestData = await request.json();
    clothesName = requestData.clothesName;
    idolName = requestData.idolName;
    existingIds = requestData.existingIds;

    // 既存のpoems.jsonからアイドル名対応を構築
    const fs = require("fs");
    const path = require("path");
    const poemsJsonPath = path.join(process.cwd(), "../../data/poems.json");

    let poemsData = { poems: [] };
    try {
      const poemsContent = fs.readFileSync(poemsJsonPath, "utf8");
      poemsData = JSON.parse(poemsContent);
    } catch (error) {
      console.log("Could not read poems.json, proceeding without it");
    }

    console.log("=== Smart ID Generation ===");
    console.log("Input:", { clothesName, idolName });

    // 1. poems.jsonからアイドル名対応マッピングを構築
    const buildIdolMappings = (poemsData: any) => {
      const japaneseToEnglish: Record<
        string,
        { english: string; count: number }
      > = {};

      poemsData.poems.forEach((poem: any) => {
        if (poem.id && poem.idolName) {
          const parts = poem.id.split("_");
          if (parts.length >= 2) {
            const englishIdol = parts[1];
            const japaneseIdol = poem.idolName;

            if (!japaneseToEnglish[japaneseIdol]) {
              japaneseToEnglish[japaneseIdol] = {
                english: englishIdol,
                count: 0
              };
            }
            japaneseToEnglish[japaneseIdol].count++;
          }
        }
      });

      console.log("=== Idol Mapping Analysis ===");
      console.log(
        `Found mappings for ${Object.keys(japaneseToEnglish).length} idols:`
      );
      Object.entries(japaneseToEnglish).forEach(([japanese, data]) => {
        console.log(
          `  ${japanese} -> ${data.english} (${data.count} examples)`
        );
      });

      return japaneseToEnglish;
    };

    const idolMappings = buildIdolMappings(poemsData);

    // 衣装名マッピングも構築
    const buildClothesMappings = (poemsData: any) => {
      const japaneseToEnglish: Record<
        string,
        { english: string; count: number }
      > = {};

      poemsData.poems.forEach((poem: any) => {
        if (poem.id && poem.clothesTitle) {
          const parts = poem.id.split("_");
          if (parts.length >= 2) {
            const englishClothes = parts[0];
            const japaneseClothes = poem.clothesTitle;

            if (!japaneseToEnglish[japaneseClothes]) {
              japaneseToEnglish[japaneseClothes] = {
                english: englishClothes,
                count: 0
              };
            }
            japaneseToEnglish[japaneseClothes].count++;
          }
        }
      });

      console.log("=== Clothes Mapping Analysis ===");
      console.log(
        `Found mappings for ${Object.keys(japaneseToEnglish).length} clothes:`
      );
      Object.entries(japaneseToEnglish)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 10)
        .forEach(([japanese, data]) => {
          console.log(
            `  ${japanese} -> ${data.english} (${data.count} examples)`
          );
        });

      return japaneseToEnglish;
    };

    const clothesMappings = buildClothesMappings(poemsData);

    // 2. 既存IDから衣装名・アイドル名パターンを完全抽出
    const analyzeExistingIds = (existingIds: string[]) => {
      const clothesPatterns: Record<
        string,
        { count: number; examples: string[] }
      > = {};
      const idolPatterns: Record<
        string,
        { englishName: string; count: number; examples: string[] }
      > = {};

      existingIds.forEach((id) => {
        const parts = id.split("_");
        if (parts.length >= 2) {
          const clothesPart = parts[0];
          const idolPart = parts[1];

          // 衣装パターンの記録
          if (!clothesPatterns[clothesPart]) {
            clothesPatterns[clothesPart] = { count: 0, examples: [] };
          }
          clothesPatterns[clothesPart].count++;
          clothesPatterns[clothesPart].examples.push(id);

          // アイドルパターンの記録
          if (!idolPatterns[idolPart]) {
            idolPatterns[idolPart] = {
              englishName: idolPart,
              count: 0,
              examples: []
            };
          }
          idolPatterns[idolPart].count++;
          idolPatterns[idolPart].examples.push(id);
        }
      });

      return { clothesPatterns, idolPatterns };
    };

    const {
      clothesPatterns: existingClothesPatterns,
      idolPatterns: existingIdolPatterns
    } = analyzeExistingIds(existingIds);

    // 3. アイドル名の直接マッチング関数（改良版）
    const findIdolEnglishName = (japaneseIdolName: string) => {
      console.log(`=== Finding English name for idol: ${japaneseIdolName} ===`);

      // poems.jsonからの直接マッピング（最優先）
      if (idolMappings[japaneseIdolName]) {
        const mapping = idolMappings[japaneseIdolName];
        console.log(
          `✓ Direct mapping found: ${japaneseIdolName} -> ${mapping.english} (${mapping.count} examples)`
        );
        return {
          englishName: mapping.english,
          confidence: 1.0,
          method: "direct-mapping",
          usageCount: mapping.count
        };
      }

      // フォールバック: 類似の日本語名を検索
      const similarIdols = Object.keys(idolMappings).filter((idol) => {
        const similarity = calculateSimpleSimilarity(japaneseIdolName, idol);
        return similarity > 0.8; // 80%以上の類似度
      });

      if (similarIdols.length > 0) {
        const bestMatch = similarIdols[0];
        const mapping = idolMappings[bestMatch];
        console.log(
          `⚠ Similar idol found: ${japaneseIdolName} -> ${bestMatch} -> ${mapping.english}`
        );
        return {
          englishName: mapping.english,
          confidence: 0.8,
          method: "similar-mapping",
          usageCount: mapping.count
        };
      }

      console.log(`❌ No mapping found for ${japaneseIdolName}`);
      return null;
    };

    // 4. 衣装名の直接マッチング関数（改良版）
    const findClothesEnglishName = (japaneseClothesName: string) => {
      console.log(
        `=== Finding English name for clothes: ${japaneseClothesName} ===`
      );

      // poems.jsonからの直接マッピング（最優先）
      if (clothesMappings[japaneseClothesName]) {
        const mapping = clothesMappings[japaneseClothesName];
        console.log(
          `✓ Direct mapping found: ${japaneseClothesName} -> ${mapping.english} (${mapping.count} examples)`
        );
        return {
          englishName: mapping.english,
          confidence: 1.0,
          method: "direct-mapping",
          usageCount: mapping.count
        };
      }

      // フォールバック1: 類似の日本語衣装名を検索
      const similarClothes = Object.keys(clothesMappings).filter((clothes) => {
        const similarity = calculateSimpleSimilarity(
          japaneseClothesName,
          clothes
        );
        return similarity > 0.7; // 70%以上の類似度
      });

      if (similarClothes.length > 0) {
        const bestMatch = similarClothes[0];
        const mapping = clothesMappings[bestMatch];
        console.log(
          `⚠ Similar clothes found: ${japaneseClothesName} -> ${bestMatch} -> ${mapping.english}`
        );
        return {
          englishName: mapping.english,
          confidence: 0.8,
          method: "similar-mapping",
          usageCount: mapping.count
        };
      }

      // フォールバック2: 既存の英語パターンとの類似度マッチング
      const patterns = Object.keys(existingClothesPatterns);
      let bestMatch = { pattern: "", confidence: 0 };

      for (const pattern of patterns) {
        const similarity = calculateSimpleSimilarity(
          japaneseClothesName,
          pattern
        );

        if (similarity > bestMatch.confidence && similarity > 0.4) {
          bestMatch = { pattern, confidence: similarity };
        }
      }

      if (bestMatch.pattern) {
        console.log(
          `⚠ Pattern similarity match: ${japaneseClothesName} -> ${bestMatch.pattern} (${Math.round(bestMatch.confidence * 100)}%)`
        );
        return {
          englishName: bestMatch.pattern,
          confidence: bestMatch.confidence,
          method: "pattern-similarity",
          usageCount: existingClothesPatterns[bestMatch.pattern].count
        };
      }

      console.log(`❌ No mapping found for ${japaneseClothesName}`);
      return null;
    };

    // 簡易類似度計算（包含関係ベース）
    const calculateSimpleSimilarity = (
      japanese: string,
      english: string
    ): number => {
      const japLower = japanese.toLowerCase();
      const engLower = english.toLowerCase();

      // 長さの差が大きすぎる場合は低スコア
      const lengthRatio =
        Math.min(japLower.length, engLower.length) /
        Math.max(japLower.length, engLower.length);
      if (lengthRatio < 0.3) return 0;

      // 共通する文字数をカウント
      let commonChars = 0;
      const engChars = engLower.split("");

      for (const char of japLower) {
        const index = engChars.indexOf(char);
        if (index !== -1) {
          commonChars++;
          engChars.splice(index, 1); // 重複カウントを避ける
        }
      }

      return commonChars / Math.max(japLower.length, engLower.length);
    };

    console.log("=== Pattern Analysis ===");
    console.log(
      `Clothes patterns: ${Object.keys(existingClothesPatterns).length}`
    );
    console.log(`Idol patterns: ${Object.keys(existingIdolPatterns).length}`);

    const topClothes = Object.entries(existingClothesPatterns)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5);
    console.log("Top 5 clothes patterns:");
    topClothes.forEach(([pattern, data]) => {
      console.log(`  ${pattern}: ${data.count} times`);
    });

    const topIdols = Object.entries(existingIdolPatterns)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5);
    console.log("Top 5 idol patterns:");
    topIdols.forEach(([pattern, data]) => {
      console.log(`  ${pattern}: ${data.count} times`);
    });

    // 2. 基本的なカタカナ→英語マッピング（フォールバック用）
    const generateDynamicMappings = () => {
      const baseMappings = [
        { katakana: "セレスティアル", english: "celestial" },
        { katakana: "シャイニー", english: "shiny" },
        { katakana: "エモーショナル", english: "emotional" },
        { katakana: "リスペクティブ", english: "respective" },
        { katakana: "ドレスアップ", english: "dressup" },
        { katakana: "サマー", english: "summer" },
        { katakana: "ユニフォーム", english: "uniform" },
        { katakana: "パルファム", english: "parfum" },
        { katakana: "ワークスタイル", english: "workstyle" },
        { katakana: "カラーズ", english: "colors" },
        { katakana: "ディライト", english: "delight" },
        { katakana: "リフレジェント", english: "refulgent" },
        { katakana: "プルマージュ", english: "plumage" },
        { katakana: "レストラント", english: "restaurant" },
        { katakana: "アモール", english: "amour" },
        { katakana: "ホワイト", english: "white" },
        { katakana: "アソート", english: "assort" },
        { katakana: "パフェ", english: "parfait" },
        { katakana: "ブルー", english: "blue" },
        { katakana: "ピンク", english: "pink" },
        { katakana: "レッド", english: "red" },
        { katakana: "グリーン", english: "green" },
        { katakana: "ブラック", english: "black" },
        { katakana: "ゴールド", english: "gold" },
        { katakana: "シルバー", english: "silver" }
      ];

      return baseMappings;
    };

    const dynamicMappings = generateDynamicMappings();

    // 文字列類似度計算関数（レーベンシュタイン距離ベース）
    const calculateSimilarity = (str1: string, str2: string): number => {
      const maxLength = Math.max(str1.length, str2.length);
      if (maxLength === 0) return 1;

      const distance = levenshteinDistance(str1, str2);
      return (maxLength - distance) / maxLength;
    };

    const levenshteinDistance = (str1: string, str2: string): number => {
      const matrix = Array(str2.length + 1)
        .fill(null)
        .map(() => Array(str1.length + 1).fill(null));

      for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
      for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

      for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[j][i] = Math.min(
            matrix[j][i - 1] + 1, // deletion
            matrix[j - 1][i] + 1, // insertion
            matrix[j - 1][i - 1] + indicator // substitution
          );
        }
      }

      return matrix[str2.length][str1.length];
    };

    // 4. データ駆動の衣装名英語変換
    const clothesResult = findClothesEnglishName(clothesName);
    let englishClothes = "";
    let conversionMethod = "";
    let confidence = 0;

    if (clothesResult) {
      englishClothes = clothesResult.englishName;
      conversionMethod = clothesResult.method;
      confidence = clothesResult.confidence;
      console.log(
        `✓ Clothes mapping found: ${clothesName} -> ${englishClothes} (${Math.round(confidence * 100)}%)`
      );
    } else {
      // フォールバック: 基本的な自動変換
      englishClothes = clothesName
        .replace(/ー/g, "") // 長音記号を削除
        .replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, ""); // 特殊文字削除

      // 動的マッピングを適用
      for (const mapping of dynamicMappings) {
        englishClothes = englishClothes.replace(
          new RegExp(mapping.katakana, "gi"),
          mapping.english
        );
      }

      // CamelCase化
      englishClothes = englishClothes
        .split(/[\s\-_]+/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");

      conversionMethod = "auto-fallback";
      confidence = 0.3;
      console.log(
        `🔄 Fallback conversion: ${clothesName} -> ${englishClothes}`
      );
    }

    // 5. データ駆動のアイドル名英語変換
    const idolResult = findIdolEnglishName(idolName);
    let englishIdol = "";

    if (idolResult) {
      englishIdol = idolResult.englishName;
      console.log(
        `✓ Idol mapping found: ${idolName} -> ${englishIdol} (${Math.round(idolResult.confidence * 100)}%)`
      );
    } else {
      // フォールバック: 基本的な自動変換
      englishIdol = idolName.replace(
        /[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g,
        ""
      );
      console.log(`🔄 Fallback idol conversion: ${idolName} -> ${englishIdol}`);
    }

    const generatedId = `${englishClothes}_${englishIdol}`;

    console.log("=== ID Generation Result ===");
    console.log(`Generated ID: ${generatedId}`);
    console.log(`Conversion method: ${conversionMethod}`);
    console.log(`Confidence: ${Math.round(confidence * 100)}%`);
    console.log(`Clothes: ${clothesName} -> ${englishClothes}`);
    console.log(`Idol: ${idolName} -> ${englishIdol}`);

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
    const fallbackId = `${clothesName.replace(/[^a-zA-Z0-9]/g, "")}_${idolName.replace(/[^a-zA-Z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "")}`;
    return NextResponse.json({ id: fallbackId });
  }
}
