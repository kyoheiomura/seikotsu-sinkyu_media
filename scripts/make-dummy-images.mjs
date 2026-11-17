// 写真の差し替え待ちのプレースホルダー（SVG）を作る。AI 生成写真や本番写真が入ったら不要
// 使い方: node scripts/make-dummy-images.mjs
import fs from "node:fs";
import path from "node:path";

const out = (p) => path.join(process.cwd(), "public", p);
const font = `'Hiragino Sans','Noto Sans JP',sans-serif`;

// 先生の写真は横長 3:2（カード・個別ページで使う）。被写体は中央
const people = [
  { slug: "kariok-ryo", char: "り", bg: "#d6ecef", wear: "#2c3e57" },
  { slug: "mihon-hana", char: "は", bg: "#e4eeea", wear: "#2c3e57" },
  { slug: "kamei-ichiro", char: "い", bg: "#e6edf0", wear: "#f4f6f7" },
  { slug: "reida-sakura", char: "さ", bg: "#f0ebe6", wear: "#2c3e57" },
  { slug: "kaku-takeshi", char: "た", bg: "#e3ecee", wear: "#33475f" },
  { slug: "shisaku-midori", char: "み", bg: "#efe9df", wear: "#d8c8b0" },
];

function person({ char, bg, wear }, w, h, cx) {
  const s = h / 1024; // 1024 を基準に拡大縮小
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <radialGradient id="light" cx="0.75" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect width="${w}" height="${h}" fill="url(#light)"/>
  <!-- 観葉植物の気配 -->
  <g fill="#7fb8a4" fill-opacity="0.35">
    <ellipse cx="${w * 0.08}" cy="${h * 0.3}" rx="${90 * s}" ry="${40 * s}" transform="rotate(-30 ${w * 0.08} ${h * 0.3})"/>
    <ellipse cx="${w * 0.13}" cy="${h * 0.18}" rx="${80 * s}" ry="${34 * s}" transform="rotate(25 ${w * 0.13} ${h * 0.18})"/>
    <ellipse cx="${w * 0.93}" cy="${h * 0.42}" rx="${95 * s}" ry="${40 * s}" transform="rotate(35 ${w * 0.93} ${h * 0.42})"/>
  </g>
  <!-- 人物のシルエット -->
  <path d="M${cx - 330 * s} ${h} C${cx - 320 * s} ${h - 280 * s}, ${cx - 190 * s} ${h - 360 * s}, ${cx} ${h - 360 * s} S${cx + 320 * s} ${h - 280 * s}, ${cx + 330 * s} ${h} Z" fill="${wear}" fill-opacity="0.9"/>
  <circle cx="${cx}" cy="${h - 560 * s}" r="${165 * s}" fill="#ffffff" fill-opacity="0.85"/>
  <text x="${cx}" y="${h - 500 * s}" text-anchor="middle" font-family="${font}" font-size="${170 * s}" font-weight="700" fill="#1b2a33" fill-opacity="0.7">${char}</text>
  <text x="${36 * s}" y="${h - 36 * s}" font-family="${font}" font-size="${26 * s}" font-weight="700" fill="#1b2a33" fill-opacity="0.6" letter-spacing="3">PHOTO — 写真の差し替え待ち（架空の人物）</text>
</svg>
`;
}

function scene(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024" width="1536" height="1024">
  <rect width="1536" height="1024" fill="#e3eff1"/>
  <ellipse cx="760" cy="560" rx="420" ry="170" fill="#ffffff" fill-opacity="0.7"/>
  <circle cx="900" cy="500" r="16" fill="#0c8290" fill-opacity="0.4"/>
  <text x="48" y="980" font-family="${font}" font-size="28" font-weight="700" fill="#1b2a33" fill-opacity="0.6" letter-spacing="3">PHOTO — ${label}</text>
</svg>
`;
}

fs.mkdirSync(out("images/sensei"), { recursive: true });
fs.mkdirSync(out("images/interview"), { recursive: true });
for (const p of people) fs.writeFileSync(out(`images/sensei/${p.slug}.svg`), person(p, 1536, 1024, 768));
// ファーストビュー用。人物は右寄せ（左に見出しが重なる）
fs.writeFileSync(out("images/hero.svg"), person(people[0], 2048, 1152, 1500));
fs.writeFileSync(out("images/interview/mihon-hana-hands.svg"), scene("施術の様子（差し替え待ち）"));
console.log("プレースホルダー画像を作成しました");
