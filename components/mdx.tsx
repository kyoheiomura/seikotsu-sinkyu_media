/**
 * インタビュー本文（MDX）で使える部品。CMS のリッチテキストに置き換えやすいよう、この3つに限る。
 *   <Q>質問</Q>             聞き手の質問（見出し）
 *   <Quote>言葉</Quote>     本文から抜き出した、大きく見せる言葉
 *   <Photo src alt caption />  手元や施術の様子の写真（横長 3:2）
 */
import Image from "next/image";
import type { ReactNode } from "react";

export function Q({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-start gap-4 border-t border-line pt-8">
      <span aria-hidden="true" className="mt-[0.05em] text-[1.5em] leading-none font-medium text-accent-bright">
        Q
      </span>
      <span>{children}</span>
    </h3>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative !my-14 rounded-2xl bg-accent-soft/60 py-6 pr-6 pl-12 text-[1.25rem] leading-[1.7] font-medium md:-mx-12 md:pl-20 md:text-[1.625rem]">
      <span aria-hidden="true" className="absolute top-0 left-0 font-serif text-[3.5rem] leading-none text-accent-bright/40 md:text-[5rem]">
        “
      </span>
      {children}
    </blockquote>
  );
}

export function Photo({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="!my-16 md:-mx-16">
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-mist">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          unoptimized={src.endsWith(".svg")}
          className="object-cover"
        />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-sub">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = { Q, Quote, Photo };
