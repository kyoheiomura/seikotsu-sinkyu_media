import Link from "next/link";
import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { AREA_INDEX_MIN } from "@/data/site";
import { getAreaTree, senseiInPref } from "@/lib/areas-index";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

type Props = { params: Promise<{ pref: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAreaTree().map((p) => ({ pref: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { pref: prefSlug } = await params;
  const pref = getAreaTree().find((p) => p.slug === prefSlug);
  if (!pref) return {};
  return pageMeta({
    title: `${pref.name}の整体師・鍼灸師`,
    description: `${pref.name}で取材した整体師・鍼灸師${pref.count}人のインタビュー。考え方と人柄から、通う先の先生を選べます。`,
    path: `/area/${pref.slug}/`,
    noindex: pref.count < AREA_INDEX_MIN,
  });
}

export default async function PrefPage({ params }: Props) {
  const { pref: prefSlug } = await params;
  const pref = getAreaTree().find((p) => p.slug === prefSlug);
  if (!pref) notFound();
  return (
    <ListPage
      crumbs={[
        { href: "/area/", label: "エリアから探す" },
        { href: `/area/${pref.slug}/`, label: pref.name },
      ]}
      title={`${pref.name}の先生`}
      lead={<p>{pref.name}で話を聞いた整体師・鍼灸師は{pref.count}人です（新着順）。</p>}
      people={senseiInPref(pref.slug).map(toSummary)}
    >
      <ul className="mt-8 flex flex-wrap gap-2">
        {pref.cities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/area/${pref.slug}/${c.slug}/`}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm hover:border-ink"
            >
              {c.name}
              <span className="ml-1 text-sub">（{c.count}）</span>
            </Link>
          </li>
        ))}
      </ul>
    </ListPage>
  );
}
