import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import type {
  AppStateShape,
  NotificationPrefs,
  UpdatePrefsPayload,
  UpdateSettingsPayload,
  UpsertLogPayload,
  UpsertPeriodPayload,
} from "../types/app";

const initialState: AppStateShape = {
  prefs: {
    avgPeriodDays: 5,
    avgCycleDays: 28,
    lastPeriodStart: null,
  },
  logs: [],
  periods: [],
  notifications: {
    enabled: false,
    schedule: "balanced",
  },
  meta: {
    hasCompletedOnboarding: false,
    hasCompletedSetup: false,
  },
  settings: {
    theme: "light",
    language: "tr",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updatePrefs(state, action: PayloadAction<UpdatePrefsPayload>) {
      state.prefs = { ...state.prefs, ...action.payload };
    },
    updateSettings(state, action: PayloadAction<UpdateSettingsPayload>) {
      state.settings = { ...state.settings, ...action.payload };
    },
    markOnboardingComplete(state) {
      state.meta.hasCompletedOnboarding = true;
    },
    markSetupComplete(state) {
      state.meta.hasCompletedSetup = true;
    },
    upsertPeriod(state, action: PayloadAction<UpsertPeriodPayload>) {
      const period = action.payload;
      const existingIndex = state.periods.findIndex((p) => p.start === period.start);
      if (existingIndex >= 0) {
        state.periods[existingIndex] = { ...state.periods[existingIndex], ...period };
      } else {
        state.periods.push(period);
        state.prefs.lastPeriodStart = period.start;
      }
    },
    endPeriod(state, action: PayloadAction<string>) {
      const endDate = action.payload;
      const ongoingIndex = state.periods.findIndex((p) => !p.end);
      if (ongoingIndex >= 0) {
        state.periods[ongoingIndex].end = endDate;
        const span = state.periods[ongoingIndex];
        const start = dayjs(span.start);
        const end = dayjs(endDate);
        const duration = end.diff(start, "day") + 1;
        if (duration > 0) {
          state.prefs.avgPeriodDays = Math.round((state.prefs.avgPeriodDays + duration) / 2);
        }
      }
    },
    upsertLog(state, action: PayloadAction<UpsertLogPayload>) {
      const { id, date, mood, note, symptoms } = action.payload;
      const logId = id ?? uuid();
      const existingIndex = state.logs.findIndex((l) => l.id === logId || l.date === date);
      const payload = { id: logId, date, mood, note, symptoms };
      if (existingIndex >= 0) {
        state.logs[existingIndex] = payload;
      } else {
        state.logs.push(payload);
      }
    },
    setNotifications(state, action: PayloadAction<NotificationPrefs>) {
      state.notifications = action.payload;
    },
    forceOnboardingInDev(state) {
      state.meta.hasCompletedOnboarding = false;
      state.meta.hasCompletedSetup = false;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  updatePrefs,
  updateSettings,
  markOnboardingComplete,
  markSetupComplete,
  upsertPeriod,
  endPeriod,
  upsertLog,
  setNotifications,
  forceOnboardingInDev,
  resetState,
} = appSlice.actions;

export default appSlice.reducer;
