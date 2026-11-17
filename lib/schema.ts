import { z } from "zod";
import { findCity } from "@/data/areas";
import {
  CLINIC_KINDS,
  CONCERN_SLUGS,
  FEATURES,
  INSURANCE,
  LICENSES,
  PRESSURES,
  ROLES,
  TALK_STYLES,
  WEEKDAYS,
} from "@/data/vocab";

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "半角英小文字・数字・ハイフンで書く（例: mihon-hana）");
const text = (max: number) =>
  z.string().trim().min(1, "空にしない").max(max, `${max}字以内で書く`);
const kana = z.string().regex(/^[ぁ-んー 　]+$/, "ひらがなで書く");
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "HH:MM で書く");
const yen = z.number().int().nonnegative();

export const PhotoSchema = z.object({
  src: z.string().startsWith("/images/", "public/images/ 以下のパスを書く"),
  alt: z.string().min(10, "写真の内容が分かる alt を10字以上で書く"),
});

export const SenseiSchema = z
  .object({
    slug,
    name: text(20),
    nameKana: kana,
    photo: PhotoSchema,
    catchphrase: text(32),
    types: z.array(z.enum(["seitai", "shinkyu"])).min(1),
    licenses: z.array(z.enum(LICENSES)).default([]),
    otherQualifications: z.array(text(40)).default([]),
    startedYear: z.number().int().min(1950).max(2100),
    clinics: z
      .array(z.object({ slug, role: z.enum(ROLES), days: text(30).optional() }))
      .min(1, "院を1つ以上書く"),

    // 比較項目。並び順は lib/compare-fields.ts で決める
    compare: z
      .object({
        feature: text(24), // 施術の特徴（ひとことで）
        message: text(60), // 読者へのメッセージ
        why: text(60),
        belief: text(60),
        approach: text(80),
        pressure: z.enum(PRESSURES),
        methods: z.array(text(30)).min(1).max(6),
        talkStyle: z.enum(TALK_STYLES),
        explanation: text(60),
        firstVisit: z.object({
          counselingMin: z.number().int().positive(),
          treatmentMin: z.number().int().positive(),
        }),
        visitPace: text(60),
        selfCare: z.boolean(),
        concerns: z.array(z.enum(CONCERN_SLUGS)).min(1).max(5),
        notFor: text(80),
        gender: z.enum(["女性", "男性"]).optional(),
        price: z.object({ firstVisit: yen, regular: yen, note: text(60).optional() }),
      })
      .strict(),

    interviewedAt: z.coerce.date(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    verifiedAt: z.coerce.date(),
    interviewer: text(30),
    photographer: text(30).optional(),
    listing: z.enum(["free", "paid"]).default("free"),
    draft: z.boolean().default(false),
  })
  .strict()
  .superRefine((s, ctx) => {
    if (s.types.includes("shinkyu") && !s.licenses.some((l) => l === "はり師" || l === "きゅう師")) {
      ctx.addIssue({
        code: "custom",
        path: ["licenses"],
        message: "鍼灸の先生は はり師 か きゅう師 の資格を書く",
      });
    }
    if (s.publishedAt < s.interviewedAt) {
      ctx.addIssue({ code: "custom", path: ["publishedAt"], message: "取材日より前になっている" });
    }
  });

export const ClinicSchema = z
  .object({
    slug,
    name: text(40),
    nameKana: kana,
    kind: z.enum(CLINIC_KINDS),
    address: z.object({
      prefSlug: z.string(),
      citySlug: z.string(),
      line: text(60),
      building: text(40).optional(),
    }),
    stations: z
      .array(z.object({ line: text(20), name: text(20), walkMin: z.number().int().positive() }))
      .min(1),
    hours: z
      .array(z.object({ days: z.array(z.enum(WEEKDAYS)).min(1), open: time, close: time }))
      .min(1),
    hoursNote: text(80).optional(),
    booking: z
      .object({
        phone: z.string().regex(/^[0-9-]+$/, "数字とハイフンで書く").optional(),
        url: z.url().optional(),
        line: z.url().optional(),
      })
      .refine((b) => b.phone || b.url || b.line, "予約の窓口を1つ以上書く"),
    features: z.array(z.enum(FEATURES)).default([]),
    insurance: z.enum(INSURANCE).optional(),
    verifiedAt: z.coerce.date(),
  })
  .strict()
  .superRefine((c, ctx) => {
    if (!findCity(c.address.prefSlug, c.address.citySlug)) {
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: `data/areas.ts にない地域: ${c.address.prefSlug}/${c.address.citySlug}`,
      });
    }
  });

export type Sensei = z.infer<typeof SenseiSchema>;
export type Clinic = z.infer<typeof ClinicSchema>;
