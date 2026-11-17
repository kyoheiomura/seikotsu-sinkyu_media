/**
 * エリアのマスター。院の住所はここにある slug からしか選べない（表記ゆれ対策）。
 * code は全国地方公共団体コード（上5桁）。「エリア順」の並びに使う。
 * 掲載のない地域は追加しておいてもページは作られない。
 */
export type City = { slug: string; name: string; code: number };
export type Prefecture = { slug: string; name: string; code: number; cities: City[] };

export const PREFECTURES: Prefecture[] = [
  {
    slug: "tokyo",
    name: "東京都",
    code: 13,
    cities: [
      { slug: "setagaya", name: "世田谷区", code: 13112 },
      { slug: "suginami", name: "杉並区", code: 13115 },
    ],
  },
  {
    slug: "kanagawa",
    name: "神奈川県",
    code: 14,
    cities: [{ slug: "kawasaki-nakahara", name: "川崎市中原区", code: 14133 }],
  },
];

export function findPref(prefSlug: string) {
  return PREFECTURES.find((p) => p.slug === prefSlug);
}

export function findCity(prefSlug: string, citySlug: string) {
  return findPref(prefSlug)?.cities.find((c) => c.slug === citySlug);
}
