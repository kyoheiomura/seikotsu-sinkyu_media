/** 掲載がある地域だけを集めた索引。エリアページとトップのエリア欄で使う */
import { PREFECTURES } from "@/data/areas";
import { clinicsOf, getAllSensei, type SenseiEntry } from "@/lib/content";

const inCity = (s: SenseiEntry, prefSlug: string, citySlug: string) =>
  clinicsOf(s).some((c) => c.address.prefSlug === prefSlug && c.address.citySlug === citySlug);

export function senseiInPref(prefSlug: string) {
  return getAllSensei().filter((s) => clinicsOf(s).some((c) => c.address.prefSlug === prefSlug));
}

export function senseiInCity(prefSlug: string, citySlug: string) {
  return getAllSensei().filter((s) => inCity(s, prefSlug, citySlug));
}

/** 都道府県コード順。掲載のない地域は含めない */
export function getAreaTree() {
  return PREFECTURES.map((pref) => ({
    ...pref,
    count: senseiInPref(pref.slug).length,
    cities: pref.cities
      .map((city) => ({ ...city, count: senseiInCity(pref.slug, city.slug).length }))
      .filter((c) => c.count > 0),
  })).filter((p) => p.count > 0);
}
