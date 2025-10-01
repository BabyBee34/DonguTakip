import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { buildCycleMarkerMap, findOngoingPeriod, getNextPredictedPeriod } from '../services/prediction';

export const selectAppState = (state: RootState) => state.app;

export const selectPrefs = (state: RootState) => state.app.prefs;
export const selectPeriods = (state: RootState) => state.app.periods;
export const selectLogs = (state: RootState) => state.app.logs;
export const selectNotifications = (state: RootState) => state.app.notifications;
export const selectMeta = (state: RootState) => state.app.meta;

export const selectOngoingPeriod = createSelector(selectPeriods, (periods) => findOngoingPeriod(periods));

export const selectNextPredictedPeriod = createSelector(
  selectPrefs,
  selectPeriods,
  (prefs, periods) => getNextPredictedPeriod(prefs, periods),
);

export const makeSelectCalendarMarkers = (monthISO: string) =>
  createSelector(selectPrefs, selectPeriods, (prefs, periods) => buildCycleMarkerMap({ monthISO, prefs, periods }));
export const selectSettings = (state: RootState): RootState['app']['settings'] => state.app.settings;
