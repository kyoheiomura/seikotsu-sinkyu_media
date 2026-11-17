import Image from "next/image";
import type { ReactNode } from "react";

/**
 * 背景の写真を画面に固定したまま、文章だけが上に流れていく場面。
 * children には 1画面分ずつの <Screen> を並べる。JS なし（position: sticky だけ）で動く。
 */
export function StickyScene({
  src,
  priority,
  kenburns,
  children,
}: {
  src: string;
  priority?: boolean;
  /** 写真をゆっくりズームする（冒頭だけ） */
  kenburns?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="relative bg-navy text-white">
      <div className={`sticky top-0 h-svh overflow-hidden ${kenburns ? "kenburns" : ""}`}>
        <div className="absolute inset-[-8%]" data-parallax="10">
          <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
        </div>
        {/* 明るい写真の上に、青緑がかった薄い膜。左を少し濃くして文字を読みやすく */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/50 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/40" />
      </div>
      <div className="relative -mt-[100svh]">{children}</div>
    </section>
  );
}

/** 1画面分の文章。中央に置く。group を付けると、中の data-reveal が順番に現れる */
export function Screen({
  children,
  align = "start",
  group,
}: {
  children: ReactNode;
  align?: "start" | "center";
  group?: boolean;
}) {
  return (
    <div
      data-screen
      data-reveal-group={group ? "" : undefined}
      className={`container-page flex min-h-svh flex-col justify-center py-24 ${align === "center" ? "items-center text-center" : ""}`}
    >
      {children}
    </div>
  );
}
