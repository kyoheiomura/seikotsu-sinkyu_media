import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx";

/** インタビュー本文の MDX をサーバー側で描画する */
export async function renderInterview(body: string) {
  const { default: Content } = await evaluate(body, { ...runtime, baseUrl: import.meta.url });
  return <Content components={mdxComponents} />;
}
