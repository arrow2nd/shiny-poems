import { ImageResponse } from "next/og";

import { getPoem, splitPoemText } from "libs/utils";

import { SiteInfo } from "data/site";

import { Poem } from "types/poem";

export const runtime = "edge";

export const alt = SiteInfo.description;
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const poem = getPoem(params.id);
  if (!poem) {
    return new Response("Failed to generate the image", {
      status: 500
    });
  }

  const kiwiMaru = await fetchFont(poem);
  if (!kiwiMaru) {
    return new Response("Failed to fetch font", {
      status: 500
    });
  }

  const lines = splitPoemText(poem.text);

  return new ImageResponse(
    (
      <div
        lang="ja-JP"
        style={{
          color: "#4C7ABE",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('${SiteInfo.url}/og-image-base.svg')`
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 38,
            left: 64,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            paddingRight: "40px"
          }}
        >
          <div style={{ fontSize: 32 }}>{poem.clothesName}</div>
          <div style={{ fontSize: 26 }}>{poem.idolName}</div>
        </div>
        <div
          style={{
            padding: "0 64px",
            fontSize: 64,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kiwi Maru",
          data: kiwiMaru,
          style: "normal"
        }
      ]
    }
  );
}

/**
 * Google Fonts からポエムの表示に必要なフォントを取得する
 * 参考: https://github.com/vercel/satori/blob/29fe2e4a9676a1ba41c361ec1a547d6de329b039/playground/pages/api/font.ts#L86
 * @param poem ポエム
 * @returns フォントデータ
 */
async function fetchFont({
  clothesName,
  idolName,
  text
}: Poem): Promise<ArrayBuffer | null> {
  // Kiwi Maru
  const API = `https://fonts.googleapis.com/css2?family=Kiwi+Maru&text=${encodeURIComponent(
    clothesName + idolName + text
  )}`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
      }
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) return null;

  const res = await fetch(resource[1]);

  return res.arrayBuffer();
}
