import { ListPage } from "@/components/ListPage";
import { getAllSensei } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

export const metadata = pageMeta({
  title: "鍼灸の先生を探す",
  description: "たなごころで取材した鍼灸師（はり師・きゅう師）の一覧です。施術の考え方と人柄を、先生本人の言葉で紹介しています。",
  path: "/shinkyu/",
});

export default function ShinkyuPage() {
  const people = getAllSensei()
    .filter((s) => s.types.includes("shinkyu"))
    .map(toSummary);
  return (
    <ListPage
      crumbs={[{ href: "/shinkyu/", label: "鍼灸の先生" }]}
      title="鍼灸の先生"
      lead={
        <p>
          国家資格（はり師・きゅう師）をもつ先生たちです。鍼の太さや刺激の強さ、お灸の種類は先生によって違います。比較項目の「刺激の強さ」「手技・道具」も参考にしてください。
        </p>
      }
      people={people}
    />
  );
}
