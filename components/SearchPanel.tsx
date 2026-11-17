import Link from "next/link";
import { ArrowRight, SearchIcon } from "@/components/icons";
import { CONCERNS, PRACTICE_TYPES } from "@/data/vocab";
import { getAreaTree } from "@/lib/areas-index";
import { CONDITIONS } from "@/lib/conditions";

/**
 * 先生をさがす検索フォーム。下線だけの静かな入力欄。
 * JS なしでも動く GET フォームで、/sensei/ に条件を渡す（area / type / concern / cond / q）
 */
export function SearchPanel() {
  const areas = getAreaTree();
  return (
    <form action="/sensei/" method="get" role="search" aria-label="先生をさがす">
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-10">
        <Field label="エリア">
          <select name="area" defaultValue="" className="field">
            <option value="">すべて</option>
            {areas.map((p) => (
              <optgroup key={p.slug} label={p.name}>
                <option value={p.slug}>{p.name}すべて</option>
                {p.cities.map((c) => (
                  <option key={c.slug} value={`${p.slug}/${c.slug}`}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="施術カテゴリ">
          <select name="type" defaultValue="" className="field">
            <option value="">すべて</option>
            {Object.entries(PRACTICE_TYPES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="お悩み">
          <select name="concern" defaultValue="" className="field">
            <option value="">すべて</option>
            {CONCERNS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="特徴・こだわり">
          <select name="cond" defaultValue="" className="field">
            <option value="">すべて</option>
            {CONDITIONS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
        <label className="relative block flex-1">
          <span className="text-xs font-bold text-sub">フリーワード</span>
          <span className="relative mt-1 block">
            <SearchIcon size={17} className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-sub" />
            <input type="search" name="q" placeholder="名前・駅名・手技など" className="field !pl-7 font-normal" />
          </span>
        </label>
        <div className="flex items-center gap-6">
          <button type="submit" className="btn-primary !min-h-12 !px-8">
            先生をさがす
            <ArrowRight size={16} />
          </button>
          <Link href="/sensei/#filters" className="text-xs font-bold underline underline-offset-4 hover:text-accent">
            さらに条件で絞り込む
          </Link>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-sub">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
