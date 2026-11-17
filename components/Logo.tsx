/** ロゴ：明朝の文字組みだけ。マークは持たない */
export function Logo({ size = "md", invert = false }: { size?: "md" | "lg"; invert?: boolean }) {
  return (
    <span
      className={`inline-flex items-baseline gap-2.5 font-serif font-semibold tracking-[0.08em] ${invert ? "text-white" : "text-ink"} ${
        size === "lg" ? "text-[1.75rem]" : "text-[1.25rem] md:text-[1.375rem]"
      }`}
    >
      たなごころ
      <span className={`text-[0.625rem] font-sans font-medium tracking-[0.16em] ${invert ? "text-white/60" : "text-sub"}`}>
        整体・鍼灸メディア
      </span>
    </span>
  );
}

/** 補助ロゴ：縦組み。about ページで使う */
export function LogoVertical({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block font-serif text-4xl font-semibold tracking-[0.2em] [writing-mode:vertical-rl] ${className}`}>
      たなごころ
    </span>
  );
}
