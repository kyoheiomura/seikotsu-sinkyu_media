import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RevealChars, RevealTitle } from "@/components/Reveal";
import { SenseiGrid } from "@/components/SenseiCard";
import { Screen, StickyScene } from "@/components/StickyScene";
import { ArrowRight } from "@/components/icons";
import { SITE } from "@/data/site";
import { getAllSensei } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { seq } from "@/lib/reveal";
import { toSummary } from "@/lib/view";

/*
 * トップは「掲載される先生」に向けたページ。探す機能は /sensei/ に置く。
 * 背景の写真を固定したまま文章が流れる場面（StickyScene）と、白い面を交互に置く。
 * 写真は顔の入らない手元・道具・施術室だけ（public/images/）。
 */
export const metadata = pageMeta({ absoluteTitle: SITE.defaultTitle, path: "/" });

const PHOTO = {
  hero: "/images/room.png",
  hands: "/images/sensei/kariok-ryo-shoulder.png",
  needles: "/images/sensei/mihon-hana-needles.png",
  stretch: "/images/sensei/kamei-ichiro-stretch.png",
  back: "/images/sensei/kaku-takeshi-back.png",
  moxa: "/images/sensei/reida-sakura-moxa.png",
  shoulders: "/images/sensei/shisaku-midori-shoulders.png",
};

const HOW = [
  {
    no: "01",
    en: "Your own words.",
    title: "先生ご本人の言葉で、知る",
    body: "この仕事を選んだきっかけ、施術で大切にしていること、合わないかもしれない人。お聞きしたことを、ご本人の言葉のまま載せています。きれいな成功談ではなく、その人の考え方が分かる記事です。",
    photo: PHOTO.needles,
  },
  {
    no: "02",
    en: "The right match.",
    title: "自分に合う先生に、出会える",
    body: "鍼灸にいくつもの流派があるように、先生によって得意とする施術スタイルも、体に対する考え方も違います。鍼や手技の選び方、どこから整えていくかという順番、通い方の提案。そうした違いを知ったうえで、点数ではなく「自分に合うか」で選べます。",
    photo: PHOTO.stretch,
  },
  {
    no: "03",
    en: "Chosen with understanding.",
    title: "納得してから、会いに行く",
    body: "インタビューと比較項目を読んでから、先生を選ぶ。考え方や施術の進め方を知ったうえで行くので、「思っていたのと違う」が起きにくくなります。院の場所や受付時間は、各先生のページにまとめています。",
    photo: PHOTO.back,
  },
];

const ENTRIES = [
  { href: "/shinkyu/", en: "Shinkyu", title: "鍼灸の先生", body: "はり師・きゅう師の先生たち" },
  { href: "/seitai/", en: "Seitai", title: "整体の先生", body: "手で体の使い方を見直す先生たち" },
  { href: "/sensei/#filters", en: "Concerns", title: "よく受ける相談から", body: "肩こり、眠りの浅さ、産前産後の体など" },
];

export default function Home() {
  const all = getAllSensei();
  const examples = all.slice(0, 3).map(toSummary);

  return (
    <>
      {/* 場面1：施術室。見出し → 宣言、の2画面 */}
      <StickyScene src={PHOTO.hero} priority kenburns>
        <Screen group>
          <span className="eyebrow !text-white/70" data-reveal="fade" style={seq(0)}>
            Interview media for seitai &amp; shinkyu
          </span>
          <RevealChars
            as="h1"
            lines={["院ではなく、", "人で選ぶ。"]}
            accent="人"
            className="mt-8 font-serif text-[clamp(2.5rem,7.9vw,5rem)] leading-[1.5] font-medium tracking-[0.055em] [text-shadow:0_2px_24px_rgb(9_27_43/0.35)]"
            style={seq(1)}
          />
          <p className="mt-10 max-w-[32rem] text-[0.9375rem] leading-[2.1] text-white/85 md:text-base" data-reveal="fade" style={seq(7)}>
            たなごころは、整体師・鍼灸師一人ひとりを取材し、考えと人柄をご本人の言葉で届けるメディアです。安さや近さではなく「この人に任せたい」で、通う先を選べます。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal="fade" style={seq(9)}>
            <Link href="/sensei/" className="btn-primary !bg-white !text-ink hover:!bg-accent-soft">
              先生をさがす
            </Link>
            <a href="#purpose" className="link-quiet text-white/85">
              たなごころについて
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Screen>
        <Screen group>
          <span className="eyebrow !text-accent-bright" data-reveal="fade">
            Our purpose
          </span>
          <RevealTitle
            lines={["星も、ランキングも、", "ありません。"]}
            className="mt-8 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.6] font-medium tracking-[0.04em]"
          />
          <RevealTitle
            lines={["あるのは、", "先生本人の言葉だけ。"]}
            className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.6] font-medium tracking-[0.04em]"
          />
        </Screen>
        <Screen group>
          <div className="max-w-[34rem] space-y-10 text-[0.9375rem] leading-[2.3] text-white/90 md:text-[1.0625rem]">
            <p data-reveal="fade" style={seq(0)}>
              体の感じ方も、合う手の当たり方も、
              <br />
              人によって違います。
            </p>
            <p data-reveal="fade" style={seq(3)}>
              誰かの口コミ評価だけでは、
              <br />
              その人に合う先生は決まりません。
            </p>
            <p data-reveal="fade" style={seq(6)}>
              だから、点数のかわりに、
              <br />
              先生本人の言葉を載せています。
            </p>
            <p data-reveal="fade" style={seq(9)}>
              安さや近さではなく「この人に任せたい」で
              <br />
              選ばれる出会いを増やしていきます。
            </p>
          </div>
        </Screen>
      </StickyScene>

      {/* 白い面：01・02・03 */}
      <section aria-labelledby="how-title" className="bg-paper py-28 md:py-44">
        <div className="container-page">
          <span className="eyebrow" data-reveal="fade">
            What we do
          </span>
          <RevealTitle id="how-title" lines={["星評価や口コミだけでは、", "伝わらないことがある。"]} className="title-serif mt-6" />
          <ol className="mt-20 space-y-24 md:mt-32 md:space-y-40">
            {HOW.map((item, i) => (
              <li key={item.no} className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[3/2] rounded-sm" data-reveal="photo">
                    <div className="photo-drift absolute inset-0">
                      <Image src={item.photo} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                </div>
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`} data-reveal-group>
                  <p className="flex items-baseline gap-4">
                    <span className="font-serif text-4xl text-accent md:text-5xl" data-reveal="rise">
                      <span className="reveal-ink">{item.no}</span>
                    </span>
                    <span className="eyebrow !normal-case !tracking-[0.12em]" data-reveal="fade">
                      {item.en}
                    </span>
                  </p>
                  <span aria-hidden="true" className="mt-5 block h-px w-full bg-accent/35" data-reveal="line" />
                  <RevealTitle as="h3" lines={[item.title]} className="mt-6 text-2xl md:text-[2rem]" />
                  <p className="mt-6 text-[0.9375rem] leading-[2.1] text-sub" data-reveal="fade">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 場面2：お灸の道具。読み方の案内 */}
      <StickyScene src={PHOTO.moxa}>
        <Screen group>
          <span className="eyebrow !text-accent-bright" data-reveal="fade">
            How to read
          </span>
          <RevealTitle
            lines={["読んで、比べて、", "会いに行く。"]}
            className="mt-8 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.6] font-medium tracking-[0.04em]"
          />
          <p className="mt-10 max-w-[30rem] text-[0.9375rem] leading-[2.2] text-white/85 md:text-base" data-reveal="fade" style={seq(4)}>
            まずは、気になる先生のインタビューを一本。
            <br />
            迷ったら、考え方や施術スタイルの違いを読み比べる。
            <br />
            会ってみたい先生が決まったら、院のページから連絡できます。
          </p>
        </Screen>
      </StickyScene>

      {/* 白い面：新着インタビュー */}
      <section aria-labelledby="latest-title" className="bg-paper py-28 md:py-44">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow" data-reveal="fade">
                Interviews
              </span>
              <RevealTitle id="latest-title" lines={["新着インタビュー"]} className="title-serif mt-5" />
            </div>
            <Link href="/sensei/" className="link-quiet" data-reveal="fade">
              すべてのインタビューを見る
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-16 md:mt-24">
            <SenseiGrid people={examples} />
          </div>
        </div>
      </section>

      {/* 薄い水色の面：探し方の入口 */}
      <section aria-labelledby="find-title" className="bg-mist py-28 md:py-44">
        <div className="container-page">
          <span className="eyebrow" data-reveal="fade">
            Find
          </span>
          <RevealTitle id="find-title" lines={["先生をさがす"]} className="title-serif mt-5" />
          <ul className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3 md:gap-6">
            {ENTRIES.map((e, i) => (
              <li key={e.href} data-reveal="fade" style={seq(i)}>
                <Link
                  href={e.href}
                  className="entry-card group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-sm bg-paper p-7 transition-colors hover:bg-navy hover:text-white md:min-h-48 md:p-9"
                >
                  <span className="eyebrow group-hover:!text-accent-bright">{e.en}</span>
                  <span>
                    <span className="flex items-center justify-between font-serif text-2xl md:text-[1.75rem]">
                      {e.title}
                      <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="mt-2 block text-[0.8125rem] text-sub group-hover:text-white/75">{e.body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 場面3：肩に置かれた手。読者への呼びかけ */}
      <StickyScene src={PHOTO.shoulders}>
        <Screen align="center" group>
          <span className="eyebrow !text-accent-bright" data-reveal="fade">
            For you
          </span>
          <RevealTitle
            lines={["「この人に任せたい」で、", "選んでいい。"]}
            className="mt-8 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.6] font-medium tracking-[0.04em]"
          />
          <p className="mt-10 max-w-[32rem] text-[0.9375rem] leading-[2.1] text-white/85" data-reveal="fade" style={seq(4)}>
            体の感じ方は、人によって違います。あなたに合う先生を、先生本人の言葉から探してください。
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4" data-reveal="fade" style={seq(6)}>
            <Link href="/sensei/" className="btn-primary !min-h-12 !bg-white !px-9 !text-ink hover:!bg-accent-soft">
              先生をさがす
            </Link>
          </div>
        </Screen>
      </StickyScene>

      {/* 先生向けの案内は、いちばん下に小さく */}
      <section aria-label="先生の方へ" className="bg-paper">
        <div className="container-page flex flex-col gap-4 border-b border-line py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.875rem] text-sub">
            <span className="eyebrow mb-1">For practitioners</span>
            整体師・鍼灸師の方へ。取材を受けていただける先生を探しています。
          </p>
          <Link href="/join/" className="link-quiet">
            掲載を希望する先生へ
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          alternateName: "たなごころ 整体・鍼灸メディア",
          url: `${SITE.url}/`,
          description: SITE.description,
          inLanguage: "ja",
        }}
      />
    </>
  );
}
