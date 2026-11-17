/**
 * コンテンツを読む唯一の入口。ページはここの関数だけを使う。
 * ヘッドレス CMS に移るときは、このファイルの中身（読み込み元）だけを差し替える。
 * Zod スキーマは移行後も「入口の検証」としてそのまま使う。
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import YAML from "yaml";
import type { z } from "zod";
import { ClinicSchema, SenseiSchema, type Clinic, type Sensei } from "@/lib/schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type SenseiEntry = Sensei & { body: string; file: string };
export type ClinicEntry = Clinic & { file: string };

type Store = { sensei: SenseiEntry[]; clinics: ClinicEntry[] };
let cache: Store | null = null;

function listFiles(dir: string, ext: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(ext) && !f.startsWith("_"))
    .map((f) => path.join(full, f));
}

function formatIssues(file: string, error: z.ZodError) {
  const rel = path.relative(process.cwd(), file);
  return `${rel}\n${error.issues.map((i) => `  - ${i.path.join(".") || "(全体)"}: ${i.message}`).join("\n")}`;
}

/** 全コンテンツを読み、検証する。1件でも不正があれば全件まとめて例外にする */
export function loadContent(): Store {
  if (cache) return cache;
  const errors: string[] = [];

  const clinics: ClinicEntry[] = [];
  for (const file of listFiles("clinic", ".yaml")) {
    const result = ClinicSchema.safeParse(YAML.parse(fs.readFileSync(file, "utf8")));
    if (!result.success) {
      errors.push(formatIssues(file, result.error));
      continue;
    }
    if (result.data.slug !== path.basename(file, ".yaml")) {
      errors.push(`${path.relative(process.cwd(), file)}\n  - slug とファイル名を一致させる`);
    }
    clinics.push({ ...result.data, file });
  }

  const sensei: SenseiEntry[] = [];
  for (const file of listFiles("sensei", ".mdx")) {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const result = SenseiSchema.safeParse(data);
    if (!result.success) {
      errors.push(formatIssues(file, result.error));
      continue;
    }
    const s = result.data;
    const rel = path.relative(process.cwd(), file);
    if (s.slug !== path.basename(file, ".mdx")) errors.push(`${rel}\n  - slug とファイル名を一致させる`);
    for (const c of s.clinics) {
      if (!clinics.some((cl) => cl.slug === c.slug)) {
        errors.push(`${rel}\n  - clinics: content/clinic/${c.slug}.yaml がない`);
      }
    }
    if (!fs.existsSync(path.join(PUBLIC_DIR, s.photo.src))) {
      errors.push(`${rel}\n  - photo.src: public${s.photo.src} がない`);
    }
    sensei.push({ ...s, body: content, file });
  }

  if (errors.length > 0) {
    throw new Error(`コンテンツの検証に失敗しました（${errors.length}件）\n\n${errors.join("\n\n")}`);
  }

  sensei.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime() || a.slug.localeCompare(b.slug),
  );
  cache = { sensei, clinics };
  return cache;
}

const showDrafts = process.env.SHOW_DRAFTS === "1";

/** 公開中の先生（新着順） */
export function getAllSensei(): SenseiEntry[] {
  return loadContent().sensei.filter((s) => showDrafts || !s.draft);
}

export function getSensei(slug: string) {
  return getAllSensei().find((s) => s.slug === slug);
}

export function getAllClinics(): ClinicEntry[] {
  return loadContent().clinics;
}

export function getClinic(slug: string) {
  return getAllClinics().find((c) => c.slug === slug);
}

/** 先生がいる院（1つ目が主な院） */
export function clinicsOf(s: Sensei): ClinicEntry[] {
  return s.clinics.map((c) => getClinic(c.slug)!).filter(Boolean);
}

/** 院にいる先生（新着順）。Sensei.clinics から逆にたどる */
export function senseiOfClinic(clinicSlug: string) {
  return getAllSensei().filter((s) => s.clinics.some((c) => c.slug === clinicSlug));
}
