import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE } from "@/data/site";

const GROUPS = [
  {
    label: "さがす",
    links: [
      { href: "/sensei/", label: "先生をさがす" },
      { href: "/shinkyu/", label: "鍼灸の先生" },
      { href: "/seitai/", label: "整体の先生" },
    ],
  },
  {
    label: "たなごころ",
    links: [
      { href: "/about/editorial-policy/", label: "編集・表現ポリシー" },
      { href: "/join/", label: "掲載を希望する先生へ" },
      { href: "/privacy/", label: "プライバシーポリシー" },
      { href: `mailto:${SITE.contactEmail}`, label: "お問い合わせ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-6">
          <Logo size="lg" invert />
          <p className="mt-8 max-w-[26rem] font-serif text-lg leading-[1.9]">
            数字ではなく、人で選ぶ。
            <br />
            星も、ランキングも、ありません。
            <br />
            あるのは、先生本人の言葉だけ。
          </p>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.label} aria-label={`フッター（${g.label}）`} className="md:col-span-3">
            <p className="eyebrow !text-white/50">{g.label}</p>
            <ul className="mt-5 space-y-3 text-[0.8125rem]">
              {g.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/80 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-page border-t border-white/15 py-6 text-[0.6875rem] text-white/50">
        © たなごころ 整体・鍼灸メディア
      </div>
    </footer>
  );
}
