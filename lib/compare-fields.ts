/**
 * 個別ページ「〇〇さんの施術スタイル」に載せる項目の並びと書き方（components/CompareFieldsList.tsx）。
 * kind: short = 短い値／long = 文章／list = 箇条書き
 * 値に優劣の色付けはしない。
 */
import type { SenseiCompareData } from "@/lib/view";

export type FieldValue = string | string[];
export type CompareField = {
  key: string;
  label: string;
  kind: "short" | "long" | "list";
  get: (d: SenseiCompareData) => FieldValue;
};
export type CompareGroup = { key: string; label: string; fields: CompareField[] };

const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    key: "person",
    label: "人",
    fields: [
      {
        key: "type",
        label: "職種・資格",
        kind: "list",
        get: (d) => [d.typeLabel, ...d.licenses, ...d.otherQualifications.map((q) => `${q}（民間）`)],
      },
      { key: "years", label: "施術歴", kind: "short", get: (d) => `${d.years}年` },
      { key: "why", label: "この仕事を選んだきっかけ", kind: "long", get: (d) => d.compare.why },
    ],
  },
  {
    key: "belief",
    label: "考え",
    fields: [
      { key: "belief", label: "いちばん大切にしていること", kind: "long", get: (d) => d.compare.belief },
      { key: "approach", label: "不調への向き合い方", kind: "long", get: (d) => d.compare.approach },
      { key: "message", label: "メッセージ", kind: "long", get: (d) => `「${d.compare.message}」` },
      {
        key: "notFor",
        label: "ほかを勧めることがあるケース",
        kind: "long",
        get: (d) => d.compare.notFor,
      },
    ],
  },
  {
    key: "practice",
    label: "施術",
    fields: [
      { key: "feature", label: "施術の特徴", kind: "long", get: (d) => d.compare.feature },
      { key: "pressure", label: "刺激の強さ", kind: "short", get: (d) => d.compare.pressure },
      { key: "talk", label: "施術中の会話", kind: "short", get: (d) => d.compare.talkStyle },
      { key: "methods", label: "手技・道具", kind: "list", get: (d) => d.compare.methods },
      { key: "explanation", label: "説明のしかた", kind: "long", get: (d) => d.compare.explanation },
      {
        key: "firstVisit",
        label: "初回の時間",
        kind: "short",
        get: (d) =>
          `問診${d.compare.firstVisit.counselingMin}分＋施術${d.compare.firstVisit.treatmentMin}分`,
      },
      { key: "pace", label: "通うペースの考え方", kind: "long", get: (d) => d.compare.visitPace },
      {
        key: "selfCare",
        label: "セルフケアの提案",
        kind: "short",
        get: (d) => (d.compare.selfCare ? "あり" : "なし"),
      },
      { key: "concerns", label: "よく受ける相談", kind: "list", get: (d) => d.compare.concernLabels },
    ],
  },
  {
    key: "access",
    label: "通いやすさ",
    fields: [
      { key: "clinic", label: "院", kind: "list", get: (d) => d.clinics.map((c) => c.name) },
      {
        key: "area",
        label: "エリア・最寄り駅",
        kind: "long",
        get: (d) => d.clinics.map((c) => `${c.area}　${c.stations}`),
      },
      { key: "hours", label: "受付時間", kind: "long", get: (d) => d.clinics.map((c) => c.hours) },
      {
        key: "features",
        label: "設備・対応",
        kind: "list",
        get: (d) => (d.features.length ? d.features : ["特になし"]),
      },
      { key: "gender", label: "先生の性別", kind: "short", get: (d) => d.gender ?? "非公開" },
      {
        key: "price",
        label: "料金（税込）",
        kind: "long",
        get: (d) =>
          [
            `初回 ${yen(d.compare.price.firstVisit)}`,
            `2回目以降 ${yen(d.compare.price.regular)}`,
            d.compare.price.note,
          ].filter((v): v is string => Boolean(v)),
      },
    ],
  },
];
