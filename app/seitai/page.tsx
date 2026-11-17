import { ListPage } from "@/components/ListPage";
import { getAllSensei } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

export const metadata = pageMeta({
  title: "整体の先生を探す",
  description: "たなごころで取材した整体師の一覧です。施術の考え方と人柄を、先生本人の言葉で紹介しています。",
  path: "/seitai/",
});

export default function SeitaiPage() {
  const people = getAllSensei()
    .filter((s) => s.types.includes("seitai"))
    .map(toSummary);
  return (
    <ListPage
      crumbs={[{ href: "/seitai/", label: "整体の先生" }]}
      title="整体の先生"
      lead={
        <p>
          手で骨格や筋肉にはたらきかけ、体の使い方を一緒に見直す先生たちです。整体は国家資格ではないため、学んできたことや経歴は先生によってさまざまです。それぞれのインタビューで確かめてください。
        </p>
      }
      people={people}
    />
  );
}
