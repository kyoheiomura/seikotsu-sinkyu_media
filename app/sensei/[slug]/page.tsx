import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareFieldsList } from "@/components/CompareFieldsList";
import { JsonLd } from "@/components/JsonLd";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SenseiGrid } from "@/components/SenseiCard";
import { SITE } from "@/data/site";
import { clinicsOf, getAllSensei, getSensei } from "@/lib/content";
import { renderInterview } from "@/lib/mdx";
import { pageMeta } from "@/lib/meta";
import { areaOf, formatMonth, formatYen, hoursLabel, stationLabel, toCompareData, toSummary, typeLabel } from "@/lib/view";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSensei().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = getSensei((await params).slug);
  if (!s) return {};
  const area = areaOf(clinicsOf(s)[0]);
  return pageMeta({
    title: `${s.name}さん（${typeLabel(s.types)}／${area.label}）「${s.catchphrase}」`,
    description: `${area.fullLabel}の${typeLabel(s.types)}、${s.name}さんのインタビュー。${s.compare.belief}`,
    path: `/sensei/${s.slug}/`,
    ogType: "article",
  });
}

export default async function SenseiPage({ params }: Props) {
  const s = getSensei((await params).slug);
  if (!s) notFound();

  const clinics = clinicsOf(s);
  const main = areaOf(clinics[0]);
  const data = toCompareData(s);
  const interview = await renderInterview(s.body);

  // 「おすすめ」ではなく、同じ地域で話を聞いた先生を新着順に
  const others = getAllSensei().filter((o) => o.slug !== s.slug);
  const sameCity = others.filter((o) => toSummary(o).citySlugs.some((c) => data.citySlugs.includes(c)));
  const related = (sameCity.length ? sameCity : others.filter((o) => toSummary(o).prefSlug === main.pref.slug))
    .slice(0, 3)
    .map(toSummary);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/sensei/", label: "インタビュー" },
          { href: `/sensei/${s.slug}/`, label: `${s.name} 先生` },
        ]}
      />

      <article>
        <div className="container-page pt-5">
          <ProfileHeader d={data} mode="page" />
        </div>

        <section id="fields" aria-labelledby="fields-title" className="container-page scroll-mt-24 pt-24 md:pt-36">
          <h2 id="fields-title" className="heading-bar text-[1.5rem] md:text-[2rem]">
            {s.name}さんの施術スタイル
          </h2>
          <p className="mt-3 text-[0.8125rem] text-sub">
            刺激の強さや施術中の会話、初回の進め方、通うペースの考え方など、会う前に知っておきたいことをまとめています。
          </p>
          <div className="card mt-6 p-5 md:p-10">
            <CompareFieldsList data={data} />
          </div>
        </section>

        <section id="interview" aria-labelledby="interview-title" className="container-page scroll-mt-24 pt-24 md:pt-36">
          <div className="container-text mx-auto">
            <h2 id="interview-title" className="heading-bar text-[1.5rem] md:text-[2rem]">
              インタビュー
            </h2>
            <p className="mt-3 text-[0.8125rem] text-sub">取材 {formatMonth(s.interviewedAt)}</p>
            <div className="interview mt-8">{interview}</div>
          </div>
        </section>

        <section id="visit" aria-labelledby="visit-title" className="container-page scroll-mt-24 pt-24 md:pt-36">
          <h2 id="visit-title" className="heading-bar text-[1.5rem] md:text-[2rem]">
            {s.name}さんに会いに行くには
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {clinics.map((c, i) => (
              <section key={c.slug} aria-labelledby={`clinic-${c.slug}`} className="card p-6 md:p-8">
                <h3 id={`clinic-${c.slug}`} className="text-lg font-medium">
                  <Link href={`/clinic/${c.slug}/`} className="hover:text-accent">
                    {c.name}
                  </Link>
                  {s.clinics[i].days && <span className="badge ml-2 align-middle">{s.clinics[i].days}に在籍</span>}
                </h3>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <Row label="住所">
                    {areaOf(c).fullLabel}
                    {c.address.line}
                    {c.address.building && ` ${c.address.building}`}
                  </Row>
                  <Row label="最寄り駅">{stationLabel(c)}</Row>
                  <Row label="受付時間">
                    {hoursLabel(c)}
                    {c.hoursNote && <span className="block text-sub">{c.hoursNote}</span>}
                  </Row>
                  {i === 0 && (
                    <Row label="料金（税込）">
                      初回 {formatYen(s.compare.price.firstVisit)}／2回目以降 {formatYen(s.compare.price.regular)}
                      {s.compare.price.note && <span className="block text-sub">{s.compare.price.note}</span>}
                    </Row>
                  )}
                  {c.insurance && <Row label="健康保険">{c.insurance}</Row>}
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  {c.booking.url && (
                    <a href={c.booking.url} target="_blank" rel="noopener" className="btn-outline">
                      院のサイトで予約方法を見る<span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                  {c.booking.phone && (
                    <a href={`tel:${c.booking.phone}`} className="btn-outline">
                      電話する（{c.booking.phone}）
                    </a>
                  )}
                  {c.booking.line && (
                    <a href={c.booking.line} target="_blank" rel="noopener" className="btn-outline">
                      LINEで問い合わせる<span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-4 text-xs text-sub">
            予約は各院で受け付けています。
          </p>
        </section>

        <footer className="container-page pt-12">
          <div className="space-y-1.5 rounded-xl bg-mist p-5 text-xs leading-relaxed text-sub md:p-6">
            <p>
              取材 {formatMonth(s.interviewedAt)}／聞き手 {s.interviewer}
              {s.photographer && `／撮影 ${s.photographer}`}
            </p>
            <p>掲載している情報は{formatMonth(s.verifiedAt)}に確認したものです。料金や受付時間は変わることがあります。</p>
            <p>感じ方には個人差があります。強い痛み・しびれ・発熱などがあるときは、まず医療機関を受診してください。</p>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-page pt-24 md:pt-36">
          <h2 id="related" className="heading-bar text-[1.5rem] md:text-[2rem]">
            同じエリアで話を聞いた先生
          </h2>
          <div className="mt-6">
            <SenseiGrid people={related} />
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${s.name}さんインタビュー「${s.catchphrase}」`,
          datePublished: s.publishedAt.toISOString(),
          dateModified: (s.updatedAt ?? s.publishedAt).toISOString(),
          image: `${SITE.url}${s.photo.src}`,
          inLanguage: "ja",
          author: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
          publisher: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
          mainEntityOfPage: `${SITE.url}/sensei/${s.slug}/`,
          about: {
            "@type": "Person",
            name: s.name,
            jobTitle: typeLabel(s.types),
            hasCredential: s.licenses.map((l) => ({ "@type": "EducationalOccupationalCredential", name: l })),
            worksFor: clinics.map((c) => ({
              "@type": "LocalBusiness",
              name: c.name,
              url: `${SITE.url}/clinic/${c.slug}/`,
            })),
          },
        }}
      />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
      <dt className="font-bold text-sub">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
