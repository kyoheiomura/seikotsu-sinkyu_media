import type { MetadataRoute } from "next";
import { AREA_INDEX_MIN, SITE } from "@/data/site";
import { getAreaTree } from "@/lib/areas-index";
import { getAllClinics, getAllSensei } from "@/lib/content";

// noindex のページ（比較、少人数のエリア）は入れない
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const sensei = getAllSensei();
  const latest = sensei[0]?.publishedAt;

  const fixed = ["/", "/sensei/", "/seitai/", "/shinkyu/", "/area/", "/about/editorial-policy/", "/join/", "/privacy/"].map(
    (p) => ({ url: url(p), lastModified: ["/", "/sensei/"].includes(p) ? latest : undefined }),
  );

  const areas = getAreaTree().flatMap((p) => [
    ...(p.count >= AREA_INDEX_MIN ? [{ url: url(`/area/${p.slug}/`) }] : []),
    ...p.cities.filter((c) => c.count >= AREA_INDEX_MIN).map((c) => ({ url: url(`/area/${p.slug}/${c.slug}/`) })),
  ]);

  return [
    ...fixed,
    ...sensei.map((s) => ({ url: url(`/sensei/${s.slug}/`), lastModified: s.updatedAt ?? s.publishedAt })),
    ...getAllClinics().map((c) => ({ url: url(`/clinic/${c.slug}/`), lastModified: c.verifiedAt })),
    ...areas,
  ];
}
