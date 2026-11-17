# たなごころ（整体・鍼灸メディア）

整体師・鍼灸師へのインタビューを軸にした「先生を比較して選べる」メディア。
コンセプトは **院ではなく、人で選ぶ。** 星・口コミ・ランキングは作らず、判断材料は「インタビュー本文」と「共通の比較項目」の2つだけ。

- 設計書: [docs/step1-design.md](docs/step1-design.md)
- 取材の質問シート: [docs/interview-question-sheet.md](docs/interview-question-sheet.md)
- 原稿テンプレート: [templates/sensei.mdx](templates/sensei.mdx)・[templates/clinic.yaml](templates/clinic.yaml)

## 技術

Next.js（App Router・全ページ静的生成）／TypeScript／Tailwind CSS v4／MDX＋frontmatter（Zod で検証）。Vercel にそのままデプロイできる。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run build` | 原稿の検査 → ビルド → title の検査。どれかで失敗したら止まる |
| `npm start` | ビルドしたものを起動 |
| `npm run lint:content` | 原稿の検査だけ（スキーマ・参照・NG ワード・情報の鮮度） |
| `npm run check:titles` | ビルド後の全ページの title に「整体」か「鍼灸」が入っているか |
| `npm run typecheck` | 型チェック |
| `node scripts/make-dummy-images.mjs` | 写真のプレースホルダー（SVG）を作り直す |
| `bash scripts/generate-photos.sh` | 架空の先生の写真を AI 生成（Codex。内容を確認してから手動で実行） |

## 先生・院を追加する

1. `templates/clinic.yaml` を `content/clinic/<slug>.yaml` にコピーして埋める（地域は `data/areas.ts` にある値だけ）
2. `templates/sensei.mdx` を `content/sensei/<slug>.mdx` にコピーして埋める。写真は `public/images/sensei/` へ
3. `npm run lint:content` で検査 → `draft: false` にして公開
4. ファイル名が `_` で始まるものは読み込まれない（下書き置き場に使える）。`SHOW_DRAFTS=1 npm run dev` で下書きも表示

## 構成

```
app/                 ページ（/、/sensei/、/sensei/[slug]/、/seitai/、/shinkyu/、/area/…、/clinic/[slug]/、/about/…）
components/          部品（SenseiCard、ProfileHeader、SearchPanel、CompareFieldsList など）
content/             原稿（sensei/*.mdx、clinic/*.yaml）
data/                マスター（areas、vocab＝決まった語彙、ng-words、site）
lib/content.ts       コンテンツを読む唯一の入口。CMS に移るときはここだけ差し替える
lib/schema.ts        Zod スキーマ（CMS 移行後も入口の検証に使う）
lib/compare-fields.ts 個別ページ「施術スタイル」の項目の並びと言い回し
scripts/             lint・title 検査・画像
```

## 守ること（コンセプトから）

- 口コミ・星・点数・ランキング・「人気順」「おすすめ順」は作らない。並び順は新着順とエリア順だけ
- 有料掲載でも表示順を変えない。`listing: paid` の先生には「掲載プラン利用」と自動で表示する
- 料金は通常の額だけ。割引・初回価格を強調しない
- 効果を約束する表現は使わない（`data/ng-words.ts`。公開前・有料掲載の開始前に専門家の確認を受ける）
- 全ページの title に「整体」か「鍼灸」を入れる（同名の施術院と区別するため）

## 公開前にやること

- `data/site.ts` の `isDummyContent` を `false` にする（robots.txt の全面ブロックとダミー表示が外れる）
- `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定する
- ダミーの先生・院（`content/`）と写真を差し替える
- プライバシーポリシーを確定する
