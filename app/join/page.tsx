import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "掲載を希望する先生へ（整体師・鍼灸師の取材のご案内）",
  description: "たなごころでの取材・掲載を希望する整体師・鍼灸師の方へのご案内です。",
  path: "/join/",
});

export default function JoinPage() {
  return (
    <TextPage
      crumbs={[{ href: "/join/", label: "掲載を希望する先生へ" }]}
      title="掲載を希望する先生へ"
      lead={<p>先生の考えと人柄を、先生ご本人の言葉で届けたいと考えています。</p>}
    >
      <section aria-labelledby="flow">
        <h2 id="flow">取材の流れ</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>メールでご連絡ください。院の名前と場所、ご連絡先をお書き添えください。</li>
          <li>事前に、比較項目の質問シートにお答えいただきます。</li>
          <li>お話を伺い、原稿にまとめます。進め方はご相談のうえで決めます。</li>
          <li>原稿をご確認いただいてから公開します。</li>
        </ol>
      </section>

      <section aria-labelledby="terms">
        <h2 id="terms">掲載の条件</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>星や口コミ、ランキングは載せません。</li>
          <li>
            効果を約束する言い方は載せられません。詳しくは
            <Link href="/about/editorial-policy/" className="link mx-1">
              編集・表現ポリシー
            </Link>
            をご覧ください。
          </li>
        </ul>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">ご連絡先</h2>
        <p>
          <a href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("たなごころ 取材の希望")}`} className="link">
            {SITE.contactEmail}
          </a>
        </p>
      </section>
    </TextPage>
  );
}
