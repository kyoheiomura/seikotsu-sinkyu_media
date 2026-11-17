import { ImageResponse } from "next/og";

// サイト共通の OGP 画像。ロゴ案C（縦組み・明朝）を使う
export const alt = "たなごころ｜院ではなく、人で選ぶ整体・鍼灸メディア";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT = "たなごころ院ではなく人で選ぶ。整体・鍼灸メディア、";

/** 使う文字だけを Google Fonts から取得する（ビルド時に1回） */
async function loadFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(TEXT)}`,
  ).then((r) => r.text());
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`OGP 用フォントを取得できませんでした: ${family}`);
  return fetch(src).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const [mincho, gothic] = await Promise.all([
    loadFont("Shippori+Mincho+B1", 700),
    loadFont("Zen+Kaku+Gothic+New", 900),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 110px",
          background: "#ffffff",
          color: "#1a1a1a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Gothic" }}>
          <div style={{ fontSize: 84, lineHeight: 1.3, display: "flex" }}>院ではなく、</div>
          <div style={{ fontSize: 84, lineHeight: 1.3, display: "flex" }}>
            <span style={{ color: "#b4321e" }}>人</span>
            <span>で選ぶ。</span>
          </div>
          <div style={{ fontSize: 30, marginTop: 36, color: "#5c5c5c" }}>整体・鍼灸メディア</div>
        </div>
        {/* 縦組みロゴ。Satori は writing-mode 非対応のため1文字ずつ縦に積む */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Mincho", fontSize: 64, lineHeight: 1.2 }}>
          {"たなごころ".split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mincho", data: mincho, weight: 700, style: "normal" },
        { name: "Gothic", data: gothic, weight: 900, style: "normal" },
      ],
    },
  );
}
