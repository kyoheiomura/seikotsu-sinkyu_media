/**
 * 比較項目で使う決まった語彙。自由入力にすると絞り込みと比較が崩れるので、増やすときはここに足す。
 */

/** よく受ける相談。「得意な症状」「治せる症状」とは書かない（効果の表示にあたるおそれがあるため） */
export const CONCERNS = [
  { slug: "katakori", label: "肩こり" },
  { slug: "koshi", label: "腰の重さ・痛み" },
  { slug: "zutsu", label: "頭痛" },
  { slug: "nemuri", label: "眠りの浅さ" },
  { slug: "hie", label: "冷え" },
  { slug: "sanzen-sango", label: "産前産後の体" },
  { slug: "sports", label: "スポーツをする体のケア" },
  { slug: "kincho", label: "緊張しやすさ" },
  { slug: "me", label: "目の疲れ" },
  { slug: "shisei", label: "姿勢が気になる" },
] as const;
export const CONCERN_SLUGS = CONCERNS.map((c) => c.slug) as [string, ...string[]];
export type ConcernSlug = (typeof CONCERNS)[number]["slug"];
export const concernLabel = (slug: string) => CONCERNS.find((c) => c.slug === slug)?.label ?? slug;

export const PRACTICE_TYPES = {
  seitai: { label: "整体", person: "整体師" },
  shinkyu: { label: "鍼灸", person: "鍼灸師" },
} as const;
export type PracticeType = keyof typeof PRACTICE_TYPES;

/** 国家資格。民間資格は otherQualifications に自由記述 */
export const LICENSES = [
  "はり師",
  "きゅう師",
  "あん摩マッサージ指圧師",
  "柔道整復師",
  "理学療法士",
] as const;

export const PRESSURES = ["やさしめ", "中くらい", "しっかり", "相談して決める"] as const;
export const TALK_STYLES = ["静かに受けたい人向け", "話しながら", "相手に合わせる"] as const;
export const ROLES = ["院長", "スタッフ", "業務委託"] as const;

export const CLINIC_KINDS = ["整体院", "鍼灸院", "鍼灸整骨院", "施術室", "その他"] as const;
export const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日", "祝"] as const;
export const FEATURES = [
  "個室",
  "駐車場",
  "子連れ相談可",
  "訪問施術",
  "英語対応",
  "バリアフリー",
] as const;
export const INSURANCE = ["取り扱いあり（医師の同意書が必要）", "取り扱いなし"] as const;
