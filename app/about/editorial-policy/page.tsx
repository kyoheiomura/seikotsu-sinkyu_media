import { TextPage } from "@/components/TextPage";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "編集・表現ポリシー",
  description: "たなごころが整体師・鍼灸師を取材し、記事にするときの決まりごとです。",
  path: "/about/editorial-policy/",
});

export default function EditorialPolicyPage() {
  return (
    <TextPage
      crumbs={[{ href: "/about/editorial-policy/", label: "編集・表現ポリシー" }]}
      title="編集・表現ポリシー"
      lead={<p>先生の言葉を、正確に、誇張せずに届けるための決まりごとです。</p>}
    >
      <section aria-labelledby="effect">
        <h2 id="effect">効果の書き方</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>「治る」「必ず良くなる」など、効果を約束する言い方はしません。</li>
          <li>先生が得意とする症状ではなく、「よく受ける相談」として紹介します。</li>
          <li>感じ方には個人差があることを、各ページに書いています。</li>
          <li>強い痛み・しびれ・発熱などがあるときは、まず医療機関の受診をお勧めします。</li>
        </ul>
      </section>

      <section aria-labelledby="compare">
        <h2 id="compare">載せないもの</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>星、点数、口コミ、ランキングは載せません。</li>
          <li>ほかの院や先生と比べて優れている、という言い方はしません。</li>
          <li>施術した人数や受賞歴など、数字や肩書きの大小で見せる項目は作りません。</li>
          <li>割引やキャンペーンは載せません。料金は通常の額だけを載せます。</li>
        </ul>
      </section>


      <section aria-labelledby="check">
        <h2 id="check">情報の確認と訂正</h2>
        <p>
          料金・受付時間などは、取材のあとも定期的に確認しています。確認した時期は各ページに書いています。内容に誤りを見つけたときは、
          <a href={`mailto:${SITE.contactEmail}`} className="link mx-1">
            {SITE.contactEmail}
          </a>
          までお知らせください。
        </p>
      </section>
    </TextPage>
  );
}
