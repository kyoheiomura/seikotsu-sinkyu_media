import { Noto_Sans_JP, Shippori_Mincho_B1 } from "next/font/google";

// 和文フォントは分割された全ファイルを自前で配信する。preload は latin 分だけになるので切る
// 本文：Noto Sans JP（細め〜中）
export const sans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-sans-jp",
});

// 見出し：明朝（細めの太さで、静かに大きく）
export const serif = Shippori_Mincho_B1({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif-jp",
});
