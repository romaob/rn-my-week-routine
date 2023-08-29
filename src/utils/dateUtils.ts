import strings from '../values/strings.json';

export const WEEK_DAYS = [
  'week_day_sun',
  'week_day_mon',
  'week_day_tue',
  'week_day_wed',
  'week_day_thu',
  'week_day_fri',
  'week_day_sat',
];

export function getWeekDays(language: string = 'en'): string[] {
  return WEEK_DAYS.map(day => strings[day][language]);
}

export function getTimeStringFromDate(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function getDateIncreasedByMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function getDayTimesForMinutes(minutes: number): Date[] {
  const result = [];
  const date = new Date(new Date().setHours(0, 0, 0, 0));
  for (let i = 0; i < (24 * 60) / minutes; i++) {
    result.push(new Date(date.getTime() + i * minutes * 60000));
  }
  return result;
}

export function getSlotIndexOfDate(date: Date, minutes: number): number {
  return (
    new Date(date).getHours() * 2 +
    (new Date(date).getMinutes() >= minutes ? 1 : 0)
  );
}
