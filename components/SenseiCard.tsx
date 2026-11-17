import Image from "next/image";
import Link from "next/link";
import { seq } from "@/lib/reveal";
import type { SenseiSummary } from "@/lib/view";

type Props = {
  s: SenseiSummary;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  /** 現れる動きの順番（0〜3） */
  delay?: number;
};

/** インタビューカード：写真 → 明朝の一言 → 名前・職種・院・エリア */
export function SenseiCard({ s, headingLevel = "h3", priority, delay = 0 }: Props) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col" data-reveal-group style={seq(0, delay * 2)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-mist" data-reveal="photo">
        <Image
          src={s.photo.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-6 font-serif text-[1.25rem] leading-[1.7] md:text-[1.375rem]" data-reveal="title">
        <span className="reveal-line">
          <span className="reveal-ink">
            <span className="-ml-[0.45em]">「</span>
            {s.catchphrase}」
          </span>
        </span>
      </p>
      <div className="mt-5 flex flex-col gap-1 border-t border-line pt-4 text-[0.8125rem]" data-reveal="fade">
        <Heading className="font-sans text-[0.9375rem] font-medium tracking-[0.04em]">
          <Link href={`/sensei/${s.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {s.name}
            <span className="sr-only">さんのインタビューを読む</span>
          </Link>
          <span className="ml-2 text-xs font-normal text-sub">{s.typeLabel}</span>
        </Heading>
        <p className="text-xs text-sub">
          {s.clinicName}（{s.areaLabel}）
        </p>
      </div>
    </article>
  );
}

export function SenseiGrid({
  people,
  headingLevel,
  priorityCount = 0,
}: {
  people: SenseiSummary[];
  headingLevel?: "h2" | "h3";
  priorityCount?: number;
}) {
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
      {people.map((s, i) => (
        <li key={s.slug}>
          <SenseiCard s={s} headingLevel={headingLevel} priority={i < priorityCount} delay={i % 3} />
        </li>
      ))}
    </ul>
  );
}
