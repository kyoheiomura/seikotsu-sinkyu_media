/** 「特徴・こだわり」の絞り込み条件。検索パネルと一覧の両方で使う */
import type { SenseiSummary } from "@/lib/view";

export const CONDITIONS = [
  { key: "female", label: "女性の先生", test: (s: SenseiSummary) => s.gender === "女性" },
  { key: "gentle", label: "刺激はやさしめ", test: (s: SenseiSummary) => s.pressure === "やさしめ" },
  { key: "quiet", label: "静かに受けたい", test: (s: SenseiSummary) => s.talkStyle === "静かに受けたい人向け" },
  { key: "private", label: "個室あり", test: (s: SenseiSummary) => s.features.includes("個室") },
  { key: "weekend", label: "土日に受けられる", test: (s: SenseiSummary) => s.weekend },
  { key: "evening", label: "19時以降も受付", test: (s: SenseiSummary) => s.evening },
] as const;
