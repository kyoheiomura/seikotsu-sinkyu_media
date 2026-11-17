import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, HeartHandIcon, HomeIcon, NoteIcon, TargetIcon } from "@/components/icons";
import type { SenseiCompareData } from "@/lib/view";

/**
 * 先生の個別ページの頭。トップの「個別ページでは、先生の考えを深く知る。」でも同じものを見本として使う。
 *   page    … 個別ページ（名前が h1、パンくずは外側の Breadcrumbs が担当）
 *   preview … トップの見本（名前は h3、カード内に簡易パンくずを出す）
 */
export function ProfileHeader({
  d,
  mode,
  actions,
}: {
  d: SenseiCompareData;
  mode: "page" | "preview";
  actions?: ReactNode;
}) {
  const base = mode === "preview" ? `/sensei/${d.slug}/` : "";
  const Name = mode === "page" ? "h1" : "h3";
  const rows: [string, string][] = [
    ["所在地", [...new Set(d.clinics.map((c) => c.area))].join("、")],
    ["施術の特徴", d.compare.feature],
    ["手技・道具", d.compare.methods.join("・")],
    ["大切にしていること", d.compare.belief],
    ["施術スタイル", `刺激は${d.compare.pressure}・${d.compare.talkStyle}`],
  ];
  const learn = [
    { href: `${base}#fields`, label: "先生が大切にしていること", Icon: TargetIcon },
    { href: `${base}#interview`, label: "施術に込める想い", Icon: NoteIcon },
    { href: `${base}#cf-practice`, label: "来院する方との向き合い方", Icon: HeartHandIcon },
  ];

  return (
    <div className="rounded-lg bg-paper p-5 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {mode === "preview" ? (
          <p className="flex items-center gap-2 text-[0.8125rem] font-bold">
            <HomeIcon size={18} className="text-accent" />
            インタビュー
            <ChevronRight size={14} className="text-sub" />
            {d.name} 先生
          </p>
        ) : (
          <span />
        )}
        <span className="eyebrow rounded-full border border-ink px-3 py-1 !text-[0.625rem]">
          Interview
        </span>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)] md:gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,16rem)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist md:aspect-[4/5]">
          <Image
            src={d.photo.src}
            alt={mode === "page" ? d.photo.alt : ""}
            fill
            sizes="(min-width: 768px) 272px, 100vw"
            priority={mode === "page"}
            unoptimized={d.photo.src.endsWith(".svg")}
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Name className="text-2xl font-medium md:text-[1.75rem]">{d.name}</Name>
            {d.licenses.length > 0 && <span className="text-xs text-sub">{d.licenses.join("・")}</span>}
          </div>
          <p className="mt-1 text-sm text-sub">
            {d.clinics.map((c) => c.name).join("／")}・施術歴{d.years}年
          </p>
          {mode === "page" && (
            <p className="mt-4 text-lg leading-relaxed font-medium md:text-[1.375rem]">
              <span className="-ml-[0.45em]">「</span>
              {d.catchphrase}」
            </p>
          )}
          <dl className="mt-4 overflow-hidden rounded-lg border border-line text-[0.8125rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] border-b border-line last:border-b-0">
                <dt className="bg-mist px-3 py-2 font-bold">{k}</dt>
                <dd className="px-3 py-2">{v}</dd>
              </div>
            ))}
          </dl>
          {actions && <div className="mt-5 flex flex-wrap items-center gap-2">{actions}</div>}
        </div>

        <nav aria-label={`${d.name}さんのインタビューでわかること`}>
          <p className="text-[0.9375rem] font-medium">インタビューでわかること</p>
          <ul className="mt-3">
            {learn.map(({ href, label, Icon }) => (
              <li key={href} className="border-b border-line">
                <Link href={href} className="flex min-h-13 items-center gap-3 py-2 text-[0.8125rem] font-bold hover:text-accent">
                  <Icon size={20} className="shrink-0 text-accent" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={16} className="text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
