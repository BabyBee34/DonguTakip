import type { Symptom } from "../types/app";

export interface TipSuggestion {
  id: string;
  textKey: string;
  sourceKey: string;
}

const TIP_LIBRARY: Record<Symptom, TipSuggestion[]> = {
  cramp: [
    { id: "cramp-heat", textKey: "dailyLog.suggestions.cramp.heat", sourceKey: "dailyLog.suggestions.sources.acog" },
    { id: "cramp-magnesium", textKey: "dailyLog.suggestions.cramp.magnesium", sourceKey: "dailyLog.suggestions.sources.acog" },
    { id: "cramp-stretch", textKey: "dailyLog.suggestions.cramp.stretch", sourceKey: "dailyLog.suggestions.sources.mayo" },
  ],
  headache: [
    { id: "headache-hydrate", textKey: "dailyLog.suggestions.headache.hydration", sourceKey: "dailyLog.suggestions.sources.who" },
    { id: "headache-dark", textKey: "dailyLog.suggestions.headache.darkRoom", sourceKey: "dailyLog.suggestions.sources.mayo" },
    { id: "headache-magnesium", textKey: "dailyLog.suggestions.headache.magnesium", sourceKey: "dailyLog.suggestions.sources.who" },
  ],
  backPain: [
    { id: "backpain-heat", textKey: "dailyLog.suggestions.backPain.heat", sourceKey: "dailyLog.suggestions.sources.nhs" },
    { id: "backpain-posture", textKey: "dailyLog.suggestions.backPain.posture", sourceKey: "dailyLog.suggestions.sources.nhs" },
    { id: "backpain-walk", textKey: "dailyLog.suggestions.backPain.walk", sourceKey: "dailyLog.suggestions.sources.acog" },
  ],
  bloating: [
    { id: "bloating-tea", textKey: "dailyLog.suggestions.bloating.tea", sourceKey: "dailyLog.suggestions.sources.who" },
    { id: "bloating-salt", textKey: "dailyLog.suggestions.bloating.salt", sourceKey: "dailyLog.suggestions.sources.nih" },
    { id: "bloating-stretch", textKey: "dailyLog.suggestions.bloating.stretch", sourceKey: "dailyLog.suggestions.sources.nih" },
  ],
  breastTenderness: [
    { id: "breast-support", textKey: "dailyLog.suggestions.breastTenderness.support", sourceKey: "dailyLog.suggestions.sources.mayo" },
    { id: "breast-warm", textKey: "dailyLog.suggestions.breastTenderness.warmCompress", sourceKey: "dailyLog.suggestions.sources.mayo" },
    { id: "breast-caffeine", textKey: "dailyLog.suggestions.breastTenderness.caffeine", sourceKey: "dailyLog.suggestions.sources.acog" },
  ],
  acne: [
    { id: "acne-clean", textKey: "dailyLog.suggestions.acne.clean", sourceKey: "dailyLog.suggestions.sources.derm" },
    { id: "acne-pillow", textKey: "dailyLog.suggestions.acne.pillow", sourceKey: "dailyLog.suggestions.sources.derm" },
    { id: "acne-hydrate", textKey: "dailyLog.suggestions.acne.hydrate", sourceKey: "dailyLog.suggestions.sources.derm" },
  ],
  appetite: [
    { id: "appetite-protein", textKey: "dailyLog.suggestions.appetite.protein", sourceKey: "dailyLog.suggestions.sources.nih" },
    { id: "appetite-smallMeals", textKey: "dailyLog.suggestions.appetite.smallMeals", sourceKey: "dailyLog.suggestions.sources.acog" },
    { id: "appetite-track", textKey: "dailyLog.suggestions.appetite.track", sourceKey: "dailyLog.suggestions.sources.nih" },
  ],
  lowEnergy: [
    { id: "lowenergy-air", textKey: "dailyLog.suggestions.lowEnergy.freshAir", sourceKey: "dailyLog.suggestions.sources.who" },
    { id: "lowenergy-lunch", textKey: "dailyLog.suggestions.lowEnergy.lunch", sourceKey: "dailyLog.suggestions.sources.nih" },
    { id: "lowenergy-rest", textKey: "dailyLog.suggestions.lowEnergy.rest", sourceKey: "dailyLog.suggestions.sources.mayo" },
  ],
  sleepy: [
    { id: "sleepy-nap", textKey: "dailyLog.suggestions.sleepy.nap", sourceKey: "dailyLog.suggestions.sources.nih" },
    { id: "sleepy-screen", textKey: "dailyLog.suggestions.sleepy.screen", sourceKey: "dailyLog.suggestions.sources.who" },
    { id: "sleepy-routine", textKey: "dailyLog.suggestions.sleepy.routine", sourceKey: "dailyLog.suggestions.sources.nhs" },
  ],
  discharge: [
    { id: "discharge-cotton", textKey: "dailyLog.suggestions.discharge.cotton", sourceKey: "dailyLog.suggestions.sources.acog" },
    { id: "discharge-hydrate", textKey: "dailyLog.suggestions.discharge.hydrate", sourceKey: "dailyLog.suggestions.sources.who" },
    { id: "discharge-track", textKey: "dailyLog.suggestions.discharge.track", sourceKey: "dailyLog.suggestions.sources.acog" },
  ],
};

const FALLBACK_TIPS: TipSuggestion[] = [
  { id: "fallback-rest", textKey: "dailyLog.suggestions.fallback.rest", sourceKey: "dailyLog.suggestions.sources.who" },
  { id: "fallback-breathe", textKey: "dailyLog.suggestions.fallback.breathe", sourceKey: "dailyLog.suggestions.sources.nih" },
  { id: "fallback-music", textKey: "dailyLog.suggestions.fallback.music", sourceKey: "dailyLog.suggestions.sources.mayo" },
];

export const tipsService = {
  async getSuggestions(symptoms: Symptom[]): Promise<TipSuggestion[]> {
    const collection: TipSuggestion[] = [];

    if (symptoms.length) {
      symptoms.forEach((symptom) => {
        collection.push(...(TIP_LIBRARY[symptom] ?? []));
      });
    }

    const unique = new Map<string, TipSuggestion>();
    const source = collection.length ? collection : FALLBACK_TIPS;

    source.forEach((tip) => {
      if (!unique.has(tip.id)) {
        unique.set(tip.id, tip);
      }
    });

    return Array.from(unique.values()).slice(0, 3);
  },
};
