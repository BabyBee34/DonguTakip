export type Mood =
  | "ecstatic"
  | "happy"
  | "neutral"
  | "sad"
  | "angry"
  | "tired";

export type Symptom =
  | "cramp"
  | "headache"
  | "backPain"
  | "bloating"
  | "breastTenderness"
  | "acne"
  | "appetite"
  | "lowEnergy"
  | "sleepy"
  | "discharge";

export interface CyclePrefs {
  avgPeriodDays: number; // default 5
  avgCycleDays: number; // default 28
  lastPeriodStart: string | null; // ISO date (yyyy-mm-dd)
}

export interface DailyLog {
  id: string;
  date: string; // ISO (yyyy-mm-dd)
  mood?: Mood;
  symptoms: Symptom[];
  note?: string;
}

export interface PeriodSpan {
  start: string; // ISO
  end?: string; // ISO (filled when user marks period end)
}

export type NotificationFrequency = "low" | "balanced" | "high";

export interface NotificationPrefs {
  enabled: boolean;
  schedule?: NotificationFrequency;
}

export type ThemeMode = "light" | "dark";
export type LanguageCode = "tr" | "en";

export interface AppSettings {
  theme: ThemeMode;
  language: LanguageCode;
}

export interface AppStateShape {
  prefs: CyclePrefs;
  logs: DailyLog[];
  periods: PeriodSpan[];
  notifications: NotificationPrefs;
  meta: {
    hasCompletedOnboarding: boolean;
    hasCompletedSetup: boolean;
  };
  settings: AppSettings;
}

export interface UpdatePrefsPayload {
  avgPeriodDays?: number;
  avgCycleDays?: number;
  lastPeriodStart?: string | null;
}

export interface UpdateSettingsPayload {
  theme?: ThemeMode;
  language?: LanguageCode;
}

export interface UpsertPeriodPayload {
  start: string;
  end?: string;
}

export interface UpsertLogPayload {
  id?: string;
  date: string;
  mood?: Mood;
  symptoms: Symptom[];
  note?: string;
}

export type CyclePhaseId = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface CyclePhaseState {
  id: CyclePhaseId;
  cycleDay: number;
  phaseDay: number;
  cycleLength: number;
  fertileWindowStart: number;
  fertileWindowEnd: number;
}

