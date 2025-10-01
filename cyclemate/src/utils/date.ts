import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/tr";
import type { LanguageCode } from "../types/app";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

let currentLocale: LanguageCode = "tr";

export const setDayjsLocale = (locale: LanguageCode) => {
  currentLocale = locale;
  dayjs.locale(locale);
};

setDayjsLocale(currentLocale);

export type CalendarCell = {
  date: string;
  inCurrentMonth: boolean;
  isToday: boolean;
};

export const buildMonthMatrix = (reference: string | Date | Dayjs): CalendarCell[][] => {
  const ref = dayjs(reference);
  const start = ref.startOf("month").startOf("isoWeek");
  const end = ref.endOf("month").endOf("isoWeek");

  let cursor = start.clone();
  const weeks: CalendarCell[][] = [];

  while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
    const week: CalendarCell[] = [];
    for (let i = 0; i < 7; i += 1) {
      const cellDate = cursor.clone();
      week.push({
        date: cellDate.format("YYYY-MM-DD"),
        inCurrentMonth: cellDate.month() === ref.month(),
        isToday: cellDate.isSame(dayjs(), "day"),
      });
      cursor = cursor.add(1, "day");
    }
    weeks.push(week);
  }

  return weeks;
};

export const formatMonthTitle = (reference: string | Date | Dayjs) => dayjs(reference).format("MMMM YYYY");

export const toISODate = (value: string | Date | Dayjs) => dayjs(value).format("YYYY-MM-DD");

export const todayISO = () => dayjs().format("YYYY-MM-DD");

export const addDays = (date: string, amount: number) => dayjs(date).add(amount, "day").format("YYYY-MM-DD");

export const diffDays = (start: string, end: string) => dayjs(end).diff(dayjs(start), "day");

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const monthShift = (date: string, amount: number) => dayjs(date).add(amount, "month").format("YYYY-MM-DD");

export const isBetweenInclusive = (target: string, start: string, end: string) => {
  const t = dayjs(target);
  return t.isSame(start, "day") || t.isSame(end, "day") || t.isBetween(start, end, "day", "[]");
};

export const formatDisplayDate = (date: string) => dayjs(date).format("D MMMM YYYY");

export const formatWeekdayShort = (weekdayIndex: number) => {
  const base = dayjs().startOf("isoWeek").add(weekdayIndex, "day");
  return base.format("dd").toUpperCase();
};

export const daysArray = (length: number) => Array.from({ length }, (_, i) => i);

export default dayjs;


