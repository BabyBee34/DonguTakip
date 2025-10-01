import type { CyclePhaseId, Mood, Symptom } from "../types/app";

export type MoodOption = {
  id: Mood;
  labelKey: string;
  emoji: string;
  background: string;
};

export const MOOD_OPTIONS: MoodOption[] = [
  { id: "ecstatic", labelKey: "dailyLog.mood.options.ecstatic", emoji: "🤩", background: "#FFD6E8" },
  { id: "happy", labelKey: "dailyLog.mood.options.happy", emoji: "😊", background: "#FFDDD2" },
  { id: "neutral", labelKey: "dailyLog.mood.options.neutral", emoji: "🙂", background: "#BFFAE0" },
  { id: "tired", labelKey: "dailyLog.mood.options.tired", emoji: "🥱", background: "#CDB4F9" },
  { id: "sad", labelKey: "dailyLog.mood.options.sad", emoji: "😔", background: "#E5E7EB" },
  { id: "angry", labelKey: "dailyLog.mood.options.angry", emoji: "😤", background: "#FEE2E2" },
];

export type SymptomOption = {
  id: Symptom;
  labelKey: string;
  emoji: string;
  category: "pain" | "mood" | "body";
};

export const SYMPTOM_OPTIONS: SymptomOption[] = [
  { id: "cramp", labelKey: "dailyLog.symptoms.items.cramp", emoji: "🩸", category: "pain" },
  { id: "headache", labelKey: "dailyLog.symptoms.items.headache", emoji: "🤕", category: "pain" },
  { id: "backPain", labelKey: "dailyLog.symptoms.items.backPain", emoji: "💆‍♀️", category: "pain" },
  { id: "bloating", labelKey: "dailyLog.symptoms.items.bloating", emoji: "🎈", category: "body" },
  { id: "breastTenderness", labelKey: "dailyLog.symptoms.items.breastTenderness", emoji: "🌸", category: "body" },
  { id: "acne", labelKey: "dailyLog.symptoms.items.acne", emoji: "✨", category: "body" },
  { id: "appetite", labelKey: "dailyLog.symptoms.items.appetite", emoji: "🍽️", category: "body" },
  { id: "lowEnergy", labelKey: "dailyLog.symptoms.items.lowEnergy", emoji: "🪫", category: "mood" },
  { id: "sleepy", labelKey: "dailyLog.symptoms.items.sleepy", emoji: "😴", category: "mood" },
  { id: "discharge", labelKey: "dailyLog.symptoms.items.discharge", emoji: "💧", category: "body" },
];

export const EDUCATION_TIPS: string[] = [
  "Sıcak su torbası kasları rahatlatır.",
  "Zencefil çayı doğal anti-inflamatuardır.",
  "Hafif esneme hareketleri krampları azaltabilir.",
  "Suyu küçük yudumlarla içmek şişkinliği azaltır.",
  "B12 vitamini yorgunlukla savaşmaya yardımcı olur.",
];

export const MOTIVATION_QUOTES: string[] = [
  "Papatya çayı nefesini yumuşatır, sana iyi gelir.",
  "Bugün kendine nazik davran, bedenin çok çalışıyor.",
  "Derin nefes al; her döngü yeni bir başlangıç.",
  "Kısa bir yürüyüş zihnini tazeler, denemeye değer.",
];

export interface PhaseInfo {
  id: CyclePhaseId;
  emoji: string;
  titleKey: string;
  summaryKey: string;
  hormoneKey: string;
  focusKeys: string[];
  tipsKeys: string[];
  sourceKeys: string[];
}

export const PHASE_CONTENT: PhaseInfo[] = [
  {
    id: "menstrual",
    emoji: "🩸",
    titleKey: "calendar.phase.menstrual.title",
    summaryKey: "calendar.phase.menstrual.summary",
    hormoneKey: "calendar.phase.menstrual.hormones",
    focusKeys: [
      "calendar.phase.menstrual.focus.0",
      "calendar.phase.menstrual.focus.1",
      "calendar.phase.menstrual.focus.2",
    ],
    tipsKeys: [
      "calendar.phase.menstrual.tips.0",
      "calendar.phase.menstrual.tips.1",
      "calendar.phase.menstrual.tips.2",
    ],
    sourceKeys: [
      "calendar.phase.menstrual.sources.0",
      "calendar.phase.menstrual.sources.1",
    ],
  },
  {
    id: "follicular",
    emoji: "🌱",
    titleKey: "calendar.phase.follicular.title",
    summaryKey: "calendar.phase.follicular.summary",
    hormoneKey: "calendar.phase.follicular.hormones",
    focusKeys: [
      "calendar.phase.follicular.focus.0",
      "calendar.phase.follicular.focus.1",
      "calendar.phase.follicular.focus.2",
    ],
    tipsKeys: [
      "calendar.phase.follicular.tips.0",
      "calendar.phase.follicular.tips.1",
      "calendar.phase.follicular.tips.2",
    ],
    sourceKeys: [
      "calendar.phase.follicular.sources.0",
      "calendar.phase.follicular.sources.1",
    ],
  },
  {
    id: "ovulation",
    emoji: "✨",
    titleKey: "calendar.phase.ovulation.title",
    summaryKey: "calendar.phase.ovulation.summary",
    hormoneKey: "calendar.phase.ovulation.hormones",
    focusKeys: [
      "calendar.phase.ovulation.focus.0",
      "calendar.phase.ovulation.focus.1",
      "calendar.phase.ovulation.focus.2",
    ],
    tipsKeys: [
      "calendar.phase.ovulation.tips.0",
      "calendar.phase.ovulation.tips.1",
      "calendar.phase.ovulation.tips.2",
    ],
    sourceKeys: [
      "calendar.phase.ovulation.sources.0",
      "calendar.phase.ovulation.sources.1",
    ],
  },
  {
    id: "luteal",
    emoji: "🌙",
    titleKey: "calendar.phase.luteal.title",
    summaryKey: "calendar.phase.luteal.summary",
    hormoneKey: "calendar.phase.luteal.hormones",
    focusKeys: [
      "calendar.phase.luteal.focus.0",
      "calendar.phase.luteal.focus.1",
      "calendar.phase.luteal.focus.2",
    ],
    tipsKeys: [
      "calendar.phase.luteal.tips.0",
      "calendar.phase.luteal.tips.1",
      "calendar.phase.luteal.tips.2",
    ],
    sourceKeys: [
      "calendar.phase.luteal.sources.0",
      "calendar.phase.luteal.sources.1",
    ],
  },
];
