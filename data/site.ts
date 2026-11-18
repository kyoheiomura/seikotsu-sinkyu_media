export const SITE = {
  name: "たなごころ",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanagokoro.example").replace(/\/$/, ""),
  /** トップの title。ほかのページは titleSuffix を付ける */
  defaultTitle: "たなごころ｜数字ではなく、人で選ぶ整体・鍼灸メディア",
  titleSuffix: "｜たなごころ 整体・鍼灸メディア",
  description:
    "たなごころは、整体師・鍼灸師一人ひとりを取材し、考えと人柄を届けるメディアです。星もランキングもなく、先生本人の言葉と共通の比較項目で、通う先を選べます。",
  contactEmail: "hello@tanagokoro.example",
  /** 掲載中の先生・院がダミーのあいだは true。サイト上部に注意書きを出す */
  isDummyContent: true,
} as const;

/** 1ページに並べる先生の数 */
export const PAGE_SIZE = 24;
/** 比べられる先生の上限 */
/** エリアページをインデックスさせる最少人数 */
export const AREA_INDEX_MIN = 3;
