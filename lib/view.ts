/**
 * コンテンツから、表示とクライアントに渡すための形を作る。
 * ここで作るオブジェクトはすべてシリアライズ可能（Date は文字列にする）。
 */
import { findCity, findPref } from "@/data/areas";
import { concernLabel, PRACTICE_TYPES, WEEKDAYS } from "@/data/vocab";
import { clinicsOf, type ClinicEntry, type SenseiEntry } from "@/lib/content";
import type { Clinic, Sensei } from "@/lib/schema";

const BUILD_YEAR = new Date().getFullYear();

export function typeLabel(types: Sensei["types"]) {
  // 鍼灸を先に。両方なら「鍼灸師・整体師」
  return (["shinkyu", "seitai"] as const)
    .filter((t) => types.includes(t))
    .map((t) => PRACTICE_TYPES[t].person)
    .join("・");
}

export function yearsOfPractice(s: Sensei) {
  return Math.max(1, BUILD_YEAR - s.startedYear);
}

export function areaOf(c: Clinic) {
  const pref = findPref(c.address.prefSlug)!;
  const city = findCity(c.address.prefSlug, c.address.citySlug)!;
  return { pref, city, label: city.name, fullLabel: `${pref.name}${city.name}` };
}

export function formatMonth(d: Date) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

export function formatDate(d: Date) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function formatYen(n: number) {
  return `${n.toLocaleString("ja-JP")}円`;
}

export function stationLabel(c: Clinic) {
  return c.stations.map((s) => `${s.line} ${s.name}駅 徒歩${s.walkMin}分`).join("／");
}

/** 「月・火・木 10:00〜20:00」の形に */
export function hoursLabel(c: Clinic) {
  return c.hours
    .map((h) => {
      const days = [...h.days].sort((a, b) => WEEKDAYS.indexOf(a) - WEEKDAYS.indexOf(b));
      return `${days.join("・")} ${h.open}〜${h.close}`;
    })
    .join("／");
}

const opensWeekend = (c: Clinic) => c.hours.some((h) => h.days.includes("土") || h.days.includes("日"));
const opensEvening = (c: Clinic) => c.hours.some((h) => h.close >= "19:00");

/** 一覧・カード・比べるトレイで使う要約 */
export type SenseiSummary = {
  slug: string;
  name: string;
  nameKana: string;
  catchphrase: string;
  photo: { src: string; alt: string };
  types: Sensei["types"];
  typeLabel: string;
  areaLabel: string;
  clinicName: string;
  prefSlug: string;
  citySlugs: string[];
  areaCode: number;
  concerns: string[];
  gender?: string;
  pressure: string;
  talkStyle: string;
  features: string[];
  weekend: boolean;
  evening: boolean;
  publishedAt: string;
  /** フリーワード検索の対象（名前・一言・比較項目・院名・地域） */
  searchText: string;
};

export function toSummary(s: SenseiEntry): SenseiSummary {
  const clinics = clinicsOf(s);
  const main = areaOf(clinics[0]);
  return {
    slug: s.slug,
    name: s.name,
    nameKana: s.nameKana,
    catchphrase: s.catchphrase,
    photo: s.photo,
    types: s.types,
    typeLabel: typeLabel(s.types),
    areaLabel: main.label,
    clinicName: clinics[0].name,
    prefSlug: main.pref.slug,
    citySlugs: clinics.map((c) => c.address.citySlug),
    areaCode: main.city.code,
    concerns: s.compare.concerns,
    gender: s.compare.gender,
    pressure: s.compare.pressure,
    talkStyle: s.compare.talkStyle,
    features: [...new Set(clinics.flatMap((c) => c.features))],
    weekend: clinics.some(opensWeekend),
    evening: clinics.some(opensEvening),
    publishedAt: s.publishedAt.toISOString(),
    searchText: [
      s.name,
      s.nameKana,
      s.catchphrase,
      typeLabel(s.types),
      s.compare.feature,
      s.compare.belief,
      s.compare.approach,
      ...s.compare.methods,
      ...s.compare.concerns.map(concernLabel),
      ...clinics.flatMap((c) => [c.name, areaOf(c).fullLabel, ...c.stations.map((st) => st.name)]),
    ].join(" "),
  };
}

/** 比較項目の表示に使う形。個別ページと比較ページで共通 */
export type SenseiCompareData = SenseiSummary & {
  licenses: string[];
  otherQualifications: string[];
  years: number;
  compare: Omit<Sensei["compare"], "concerns"> & { concernLabels: string[] };
  clinics: { name: string; area: string; stations: string; hours: string; hoursNote?: string }[];
};

export function toCompareData(s: SenseiEntry): SenseiCompareData {
  const clinics = clinicsOf(s);
  return {
    ...toSummary(s),
    licenses: s.licenses,
    otherQualifications: s.otherQualifications,
    years: yearsOfPractice(s),
    compare: { ...s.compare, concernLabels: s.compare.concerns.map(concernLabel) },
    clinics: clinics.map((c: ClinicEntry, i) => ({
      name: s.clinics[i].days ? `${c.name}（${s.clinics[i].days}）` : c.name,
      area: areaOf(c).fullLabel,
      stations: stationLabel(c),
      hours: hoursLabel(c),
      hoursNote: c.hoursNote,
    })),
  };
}
