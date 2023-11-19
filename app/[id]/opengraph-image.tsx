import { ImageResponse } from "next/og";

import { getPoem, splitPoemText } from "libs/utils";

import { SiteInfo } from "data/site";

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

  const kiwiMaru = fetch(
    new URL(
      "https://fonts.bunny.net/kiwi-maru/files/kiwi-maru-japanese-400-normal.woff"
    )
  ).then((res) => res.arrayBuffer());

  const lines = splitPoemText(poem.text);

  return new ImageResponse(
    (
      <div
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
            flexDirection: "column",
            whiteSpace: "nowrap"
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
          data: await kiwiMaru,
          style: "normal"
        }
      ]
    }
  );
}
