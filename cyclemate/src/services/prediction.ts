import dayjs from '../utils/date';
import { addDays, isBetweenInclusive, toISODate } from '../utils/date';
import type { CyclePrefs, PeriodSpan, CyclePhaseState, CyclePhaseId } from '../types/app';

export type CycleDayMarker = 'actual' | 'predicted' | 'fertile' | 'ovulation';

export interface CalendarMarkerMap {
  [isoDate: string]: Set<CycleDayMarker>;
}

interface MarkerParams {
  monthISO: string; // YYYY-MM-DD (any day of month)
  prefs: CyclePrefs;
  periods: PeriodSpan[];
}

const ensureSet = (map: CalendarMarkerMap, date: string) => {
  if (!map[date]) {
    map[date] = new Set<CycleDayMarker>();
  }
  return map[date];
};

const addMarker = (map: CalendarMarkerMap, date: string, marker: CycleDayMarker) => {
  ensureSet(map, date).add(marker);
};

const spanDays = (start: string, end: string) => {
  const days: string[] = [];
  let cursor = dayjs(start);
  const limit = dayjs(end);
  while (cursor.isBefore(limit) || cursor.isSame(limit, 'day')) {
    days.push(cursor.format('YYYY-MM-DD'));
    cursor = cursor.add(1, 'day');
  }
  return days;
};

const resolvePeriodEnd = (span: PeriodSpan, fallbackDays: number) => {
  if (span.end) {
    return span.end;
  }
  const end = dayjs(span.start).add(Math.max(fallbackDays - 1, 0), 'day');
  return end.format('YYYY-MM-DD');
};

export const buildCycleMarkerMap = ({ monthISO, prefs, periods }: MarkerParams): CalendarMarkerMap => {
  const monthStart = dayjs(monthISO).startOf('month');
  const monthEnd = monthStart.endOf('month');
  const rangeStart = monthStart.subtract(prefs.avgCycleDays * 2, 'day');
  const rangeEnd = monthEnd.add(prefs.avgCycleDays * 2, 'day');

  const map: CalendarMarkerMap = {};
  const actualDates = new Set<string>();

  // Mark actual periods first
  periods.forEach((span) => {
    const end = resolvePeriodEnd(span, prefs.avgPeriodDays);
    spanDays(span.start, end).forEach((date) => {
      if (isBetweenInclusive(date, rangeStart.format('YYYY-MM-DD'), rangeEnd.format('YYYY-MM-DD'))) {
        addMarker(map, date, 'actual');
        actualDates.add(date);
      }
    });
  });

  const uniqueStarts = new Set<string>();
  const baseStart = prefs.lastPeriodStart ? dayjs(prefs.lastPeriodStart) : dayjs();

  // Forward cycles
  let forward = baseStart.startOf('day');
  while (forward.isBefore(rangeEnd)) {
    uniqueStarts.add(forward.format('YYYY-MM-DD'));
    forward = forward.add(prefs.avgCycleDays, 'day');
  }

  // Backward cycles
  let backward = baseStart.startOf('day').subtract(prefs.avgCycleDays, 'day');
  while (backward.isAfter(rangeStart)) {
    uniqueStarts.add(backward.format('YYYY-MM-DD'));
    backward = backward.subtract(prefs.avgCycleDays, 'day');
  }

  const sortedStarts = Array.from(uniqueStarts)
    .map((iso) => dayjs(iso))
    .sort((a, b) => a.valueOf() - b.valueOf());

  sortedStarts.forEach((startDay) => {
    const cycleStart = startDay.format('YYYY-MM-DD');
    const periodEnd = dayjs(cycleStart).add(Math.max(prefs.avgPeriodDays - 1, 0), 'day');

    spanDays(cycleStart, periodEnd.format('YYYY-MM-DD')).forEach((date) => {
      if (date < rangeStart.format('YYYY-MM-DD') || date > rangeEnd.format('YYYY-MM-DD')) {
        return;
      }
      if (!actualDates.has(date)) {
        addMarker(map, date, 'predicted');
      }
    });

    // Fertile window & ovulation
    const ovulationDay = startDay.add(prefs.avgCycleDays - 14, 'day');
    const fertileStart = ovulationDay.subtract(2, 'day');
    const fertileEnd = ovulationDay.add(2, 'day');

    spanDays(fertileStart.format('YYYY-MM-DD'), fertileEnd.format('YYYY-MM-DD')).forEach((date) => {
      if (date >= rangeStart.format('YYYY-MM-DD') && date <= rangeEnd.format('YYYY-MM-DD')) {
        addMarker(map, date, 'fertile');
      }
    });

    const ovulationISO = ovulationDay.format('YYYY-MM-DD');
    if (ovulationISO >= rangeStart.format('YYYY-MM-DD') && ovulationISO <= rangeEnd.format('YYYY-MM-DD')) {
      addMarker(map, ovulationISO, 'ovulation');
    }
  });

  return map;
};

export const findOngoingPeriod = (periods: PeriodSpan[]): PeriodSpan | undefined => {
  return periods.find((span) => !span.end);
};

export const getNextPredictedPeriod = (prefs: CyclePrefs, periods: PeriodSpan[]) => {
  const map = buildCycleMarkerMap({ monthISO: toISODate(dayjs()), prefs, periods });
  const today = toISODate(dayjs());
  const sortedDates = Object.keys(map)
    .filter((date) => map[date].has('predicted'))
    .sort();
  const next = sortedDates.find((date) => date >= today);
  if (!next) {
    return undefined;
  }
  const end = dayjs(next).add(Math.max(prefs.avgPeriodDays - 1, 0), 'day');
  return {
    start: next,
    end: end.format('YYYY-MM-DD'),
  };
};

interface CyclePhaseParams {
  prefs: CyclePrefs;
  periods: PeriodSpan[];
  date?: string;
}

export const getCyclePhaseInfo = ({ prefs, periods, date }: CyclePhaseParams): CyclePhaseState => {
  const target = date ? dayjs(date) : dayjs();
  const cycleLength = Math.max(Math.round(prefs.avgCycleDays) || 28, 21);
  const periodLength = Math.max(Math.round(prefs.avgPeriodDays) || 5, 1);

  const sortedPeriods = [...periods].sort((a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf());

  let referenceStart: dayjs.Dayjs | undefined;
  for (const span of sortedPeriods) {
    const spanStart = dayjs(span.start);
    if (spanStart.isSame(target, "day") || spanStart.isBefore(target, "day")) {
      referenceStart = spanStart.startOf("day");
      break;
    }
  }

  if (!referenceStart) {
    referenceStart = prefs.lastPeriodStart ? dayjs(prefs.lastPeriodStart) : target.clone();
  }

  while (referenceStart.isAfter(target, "day")) {
    referenceStart = referenceStart.subtract(cycleLength, "day");
  }

  let dayIndex = target.diff(referenceStart, "day");
  if (dayIndex < 0) {
    dayIndex = ((dayIndex % cycleLength) + cycleLength) % cycleLength;
  } else {
    dayIndex %= cycleLength;
  }

  const ovulationIndex = Math.min(Math.max(cycleLength - 14, periodLength), cycleLength - 1);
  const fertileStartIndex = Math.max(ovulationIndex - 2, periodLength);
  const fertileEndIndex = Math.min(ovulationIndex + 2, cycleLength - 1);

  let id: CyclePhaseId;
  let phaseStartIndex: number;

  if (dayIndex < periodLength) {
    id = "menstrual";
    phaseStartIndex = 0;
  } else if (dayIndex < fertileStartIndex) {
    id = "follicular";
    phaseStartIndex = periodLength;
  } else if (dayIndex <= fertileEndIndex) {
    id = "ovulation";
    phaseStartIndex = fertileStartIndex;
  } else {
    id = "luteal";
    phaseStartIndex = fertileEndIndex + 1;
  }

  const phaseDay = dayIndex - phaseStartIndex + 1;

  return {
    id,
    cycleDay: dayIndex + 1,
    phaseDay,
    cycleLength,
    fertileWindowStart: fertileStartIndex + 1,
    fertileWindowEnd: fertileEndIndex + 1,
  };
};
