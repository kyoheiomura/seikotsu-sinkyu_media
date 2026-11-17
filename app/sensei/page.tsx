import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/SearchPanel";
import { SenseiBrowser } from "@/components/SenseiBrowser";
import { getAreaTree } from "@/lib/areas-index";
import { getAllSensei } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

export const metadata = pageMeta({
  title: "先生を探す（整体師・鍼灸師のインタビュー一覧）",
  description:
    "たなごころで取材した整体師・鍼灸師の一覧です。職種・エリア・よく受ける相談で絞り込んで、気になる先生のインタビューを読めます。",
  path: "/sensei/",
});

export default function SenseiListPage() {
  const people = getAllSensei().map(toSummary);
  const areas = getAreaTree().map((p) => ({
    slug: p.slug,
    name: p.name,
    cities: p.cities.map((c) => ({ slug: c.slug, name: c.name })),
  }));

  return (
    <>
      <Breadcrumbs items={[{ href: "/sensei/", label: "先生を探す" }]} />
      <div className="container-page pb-8 pt-10 md:pt-14">
        <h1 className="heading-bar text-[2rem] md:text-[3rem]">先生を探す</h1>
        <p className="mt-4 text-sub">
          {people.length}人の整体師・鍼灸師に話を聞きました。星やランキングはありません。気になる先生から、読んでみてください。
        </p>
        <div className="mt-12 rounded-lg bg-mist p-6 md:p-10">
          <SearchPanel />
        </div>
        <div className="mt-12">
          <SenseiBrowser people={people} areas={areas} />
        </div>
      </div>
    </>
  );
}
