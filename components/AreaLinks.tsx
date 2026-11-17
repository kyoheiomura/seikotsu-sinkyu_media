import Link from "next/link";
import { getAreaTree } from "@/lib/areas-index";

/** 都道府県 → 市区町村のリンク。人数は目安として出すだけで、並びは地域コード順 */
export function AreaLinks({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="space-y-8">
      {getAreaTree().map((pref) => (
        <section key={pref.slug} aria-labelledby={`area-${pref.slug}`}>
          <Heading id={`area-${pref.slug}`} className="text-lg">
            <Link href={`/area/${pref.slug}/`} className="hover:underline">
              {pref.name}
              <span className="ml-1 text-sm font-normal text-sub">（{pref.count}人）</span>
            </Link>
          </Heading>
          <ul className="mt-3 flex flex-wrap gap-2">
            {pref.cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/area/${pref.slug}/${city.slug}/`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm hover:border-accent hover:text-accent"
                >
                  {city.name}
                  <span className="ml-1 text-sub">（{city.count}）</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
